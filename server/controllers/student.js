import { StudentModel } from '../models/Student.js';
import path from 'path';
import excelToJson from 'convert-excel-to-json';
import fetch from 'node-fetch';
import { CourseModel } from '../models/Course.js';
import { ClassModel } from '../models/Classs.js';
import moment from 'moment';
import { SubjectModel } from '../models/Subject.js';
import UserService from '../services/user.service.js';
import StudentService from '../services/student.service.js';
import { httpStatus } from '../constants/httpStatus.js';
import { apiStatus } from '../constants/apiStatus.js';

export const getStudentList = async (req, res) => {
  StudentModel.find((err, data) => {
    if (err) return console.error(err);
    res.status(200).json(data.map((obj) => ({ ...obj })));
  });
};

export const createStudentAccount = async (req, res) => {
  var count = 0;
  await StudentModel.countDocuments({ SchoolYear: req.body.SchoolYear }).then(
    (d) => (count = d)
  );
  var s_max;
  if (count === 0) {
    s_max = '0001';
  } else {
    await StudentModel.find({ SchoolYear: req.body.SchoolYear })
      .sort({ SID: -1 })
      .then((d) => (s_max = (Number(d[0].SID.slice(4)) + 1).toString()));
  }
  while (s_max.length < 4) {
    s_max = '0' + s_max;
  }
  const SID = 1955 + parseInt(req.body.SchoolYear) + s_max;
  const Email = getEmail(req.body.FullName, SID.toString());
  const student = new StudentModel({
    SID: SID.toString(),
    FullName: req.body.FullName,
    DateOfBirth: req.body.DateOfBirth,
    Email: Email,
    SchoolYear: req.body.SchoolYear,
    Class: req.body.Class,
    Sex: req.body.Sex,
    Major: req.body.Major,
    Born: req.body.Born,
    IdentityNumber: req.body.IdentityNumber,
    PhoneNumber: req.body.PhoneNumber,
  });
  await student.save((err, data) => {
    if (err) res.status(400).json({ success: false, message: 'error found' });
    else {
      const success = register(Email, SID);
      if (success) {
        res.status(201).json({
          success: true,
          message: 'created in database',
          SID: data.SID,
          Email: data.Email,
          FullName: data.FullName,
          IdentityNumber: data.IdentityNumber,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'error found',
        });
      }
    }
  });
};

const register = async (email, password) => {
  const user = await fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      role: 'student',
    }),
  });
  if (user.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const getStudent = async (req, res) => {
  const IdentityNumber = req.params.IdentityNumber;
  const student = await StudentModel.findOne({
    IdentityNumber: IdentityNumber,
  });
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(400).json({ message: 'error found' });
  }
};

export const deleteStudent = async (req, res) => {
  const Email = req.params.Email;

  const student = await StudentModel.findOneAndDelete({ Email: Email });
  if (student)
    res.status(200).json({
      success: true,
      message: 'Delete ' + student.Email + ' Successfully',
    });
  else res.status(400).json({ success: false, message: 'error found' });
};

export const updateStudent = async (req, res) => {
  await StudentModel.findOneAndUpdate({ SID: req.body.SID }, req.body);
  res.status(200).json({ success: true, message: 'updated' });
};

export const uploadFile = async (req, res) => {
  if (req.file) {
    const success = await importExcelData2MongoDB(
      path.resolve() + '\\uploads\\' + req.file.filename
    );
    if (success === true) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
};

export const getStudentInSubject = async (req, res) => {
  const StudentID = req.params.Student;
  const student = await StudentModel.find({ SID: StudentID });
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(400).json({ message: 'error found' });
  }
};

function removeVietnameseTones(str) {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
  str = str.replace(/??|??|???|???|??/g, 'I');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
  str = str.replace(/???|??|???|???|???/g, 'Y');
  str = str.replace(/??/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ?? ?? ??  ??, ??, ??, ??, ??
  // Remove extra spaces
  // B??? c??c kho???ng tr???ng li???n nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // B??? d???u c??u, k?? t??? ?????c bi???t
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
}

function getEmail(fullname, sid) {
  var split = fullname.split(' ');
  var email = '';
  if (split.length > 1) {
    email = removeVietnameseTones(split[split.length - 1]).toLowerCase() + '.';
    for (let i = 0; i < split.length - 1; i++) {
      email += removeVietnameseTones(split[i][0].toLowerCase());
    }
  }
  return email + sid.slice(2) + '@sis.hust.edu.vn';
}

async function importExcelData2MongoDB(filePath) {
  // -> Read Excel File to Json Data
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // Excel Sheet Name
        name: 'Sheet1',
        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 1,
        },
        // Mapping columns to keys
        columnToKey: {
          A: 'FullName',
          B: 'DateOfBirth',
          C: 'SchoolYear',
          D: 'Class',
          E: 'Gender',
          F: 'Major',
          G: 'HomeTown',
          H: 'IdentityNumber',
          I: 'PhoneNumber',
        },
      },
    ],
  });

  if (excelData.Sheet1.length > 0) {
    if (
      isDate(excelData.Sheet1[0].DateOfBirth) === false ||
      typeof excelData.Sheet1[0].SchoolYear !== 'number'
    ) {
      return false;
    } else {
      for (let i = 0; i < excelData.Sheet1.length; i++) {
        const response = await fetch('http://localhost:3001/student/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FullName: excelData.Sheet1[i].FullName,
            DateOfBirth: excelData.Sheet1[i].DateOfBirth,
            SchoolYear: excelData.Sheet1[i].SchoolYear,
            Class: excelData.Sheet1[i].Class,
            Sex: excelData.Sheet1[i].Gender,
            Major: excelData.Sheet1[i].Major,
            Born: excelData.Sheet1[i].HomeTown,
            IdentityNumber: excelData.Sheet1[i].IdentityNumber,
            PhoneNumber: excelData.Sheet1[i].PhoneNumber,
          }),
        });

        if (response['success'] === false) {
          return false;
        }
      }

      return true;
    }
  } else {
    return false;
  }
}

const isDate = (date) => {
  return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
};

const MAPPING_DAY_OF_WEEK = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const getStudentTimetable = async (req, res) => {
  const timetable = [];
  const course = await CourseModel.findOne({ email: req.params.email });
  if (course) {
    const classes = course.Classes;
    const data = [];
    for (let i = 0; i < classes.length; i++) {
      await ClassModel.findOne({ ClassID: classes[i].ClassID })
        .then((d) => data.push(d))
        .catch((err) => console.log(err));
    }
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const dayArray = getDaysBetween(MAPPING_DAY_OF_WEEK[data[i].Day]);
        const subject = await SubjectModel.findOne({ SubID: data[i].SubID });
        for (let j = 0; j < dayArray.length; j++) {
          const split = dayArray[j].split(' ');
          timetable.push({
            StartTime: data[i].StartTime,
            EndTime: data[i].EndTime,
            day: Number(split[2]),
            month: Number(split[1]),
            year: Number(split[0]),
            Room: data[i].Room,
            name: subject.SubName,
          });
        }
      }
    }
    res.status(200).json({ succes: true, timetable });
  } else {
    res.status(400).json({ success: false, message: 'not found' });
  }
};

const dateFormatTemplate = 'YYYY MM DD';

function getDaysBetween(DayOfWeek) {
  const initialDate = moment('2022-03-27', dateFormatTemplate);
  const endDate = moment(initialDate).add(4, 'month');
  const dayArray = [];

  while (initialDate.isSameOrBefore(endDate)) {
    if (initialDate.day() === DayOfWeek)
      dayArray.push(initialDate.format(dateFormatTemplate));
    initialDate.add(1, 'day');
  }
  return dayArray;
}

export const getStudentByEmail = async (req, res) => {
  //console.log(req.body);
  try {
    let StudentEmail = req.body.email;
    let StudentFind = await StudentService.findStudentByEmail(StudentEmail);

    if (StudentFind == null) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: apiStatus.INVALID_PARAM,
        message: 'Student not found',
      });
    }
    return res.status(httpStatus.OK).json({
      status: apiStatus.SUCCESS,
      message: 'get student successfully',
      data: StudentFind,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: apiStatus.OTHER_ERROR,
      message: e.message,
    });
  }
};

export const findOneAndUpdate = async (req, res) => {
  //console.log(req.body);
  try {
    let StudentEmail = req.body.email;
    let StudentAvatar = req.body.avatarUrl ? req.body.avatarUrl : undefined;
    let StudentPassword = req.body.password ? req.body.password : undefined;
    let StudentPhoneNumber = req.body.phoneNumber
      ? req.body.phoneNumber
      : undefined;
    let StudentRequest = {};
    let userRequest = {};

    if (StudentAvatar) {
      StudentRequest.avatarUrl = StudentAvatar;
    }
    if (StudentPhoneNumber) {
      StudentRequest.StudentPhoneNumber = StudentPhoneNumber;
    }
    let userUpdate = {};
    if (StudentPassword) {
      console.log(StudentPassword);
      userUpdate = await UserService.updatePassword(
        StudentEmail,
        StudentPassword
      );
    }

    let StudentUpdate = await StudentService.updateStudent(
      StudentEmail,
      StudentRequest
    );

    return res.status(httpStatus.OK).json({
      status: apiStatus.SUCCESS,
      message: 'update student successfully',
      data: { ...StudentUpdate, ...userUpdate },
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: apiStatus.OTHER_ERROR,
      message: e.message,
    });
  }
};
