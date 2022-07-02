import { LecturerModel } from '../models/Lecturer.js';
import { UserModel } from '../models/User.js';
import path from 'path';
import excelToJson from 'convert-excel-to-json';
import fetch from 'node-fetch';
import LecturerService from '../services/lecturer.service.js';
import { httpStatus } from '../constants/httpStatus.js';
import { apiStatus } from '../constants/apiStatus.js';

export const getLecturerList = async (req, res) => {
  LecturerModel.find((err, data) => {
    if (err) return console.error(err);
    res.status(200).json(data.map((obj) => ({ ...obj })));
  });
};

export const createLecturerAccount = async (req, res) => {
  var Email = getEmail(req.body.FullName);
  await LecturerModel.find({ Email: Email }).then((data) => {
    if (data.length > 0) {
      const position = Email.length - 18;
      Email = [
        Email.slice(0, position),
        Math.floor(Math.random() * 999),
        Email.slice(position),
      ].join('');
    }
  });
  await new LecturerModel({
    FullName: req.body.FullName,
    DateOfBirth: req.body.DateOfBirth,
    Email: Email,
    Sex: req.body.Sex,
    Born: req.body.Born,
    IdentityNumber: req.body.IdentityNumber,
    PhoneNumber: req.body.PhoneNumber,
  }).save((err, data) => {
    if (err)
      res
        .status(400)
        .json({ success: false, message: 'error found', error: err });
    else {
      const success = register(data.Email, data.IdentityNumber);
      if (success) {
        res.status(201).json({
          success: true,
          message: 'created in database',
          Email: data.Email,
          FullName: data.FullName,
          IdentityNumber: data.IdentityNumber,
        });
      } else {
        res.status(400).json({ success: false, message: 'error found' });
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
      role: 'lecturer',
    }),
  });
  if (user.status === 200) {
    return true;
  } else {
    return false;
  }
};

// export const getStudent = async (req, res) => {
//   const IdentityNumber = req.params.IdentityNumber;
//   const student = await StudentModel.findOne({
//     IdentityNumber: IdentityNumber,
//   });
//   if (student) {
//     res.status(200).json(student);
//   } else {
//     res.status(400).json({ message: "error found" });
//   }
// };

export const deleteLecturer = async (req, res) => {
  const Email = req.params.Email;

  const lecturer = await LecturerModel.findOneAndDelete({ Email: Email });
  if (lecturer)
    res.status(200).json({
      success: true,
      message: 'Delete ' + lecturer.Email + ' Successfully',
    });
  else res.status(400).json({ success: false, message: 'error found' });
};

export const updateLecturer = async (req, res) => {
  await LecturerModel.findOneAndUpdate(
    { IdentityNumber: req.body.IdentityNumber },
    req.body
  );
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

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
}

function getEmail(fullname) {
  var split = fullname.split(' ');
  var email = '';
  if (split.length > 1) {
    email = removeVietnameseTones(split[split.length - 1]).toLowerCase();
    for (let i = 0; i < split.length - 1; i++) {
      email += removeVietnameseTones(split[i][0].toLowerCase());
    }
  }
  return email + '@soict.hust.edu.vn';
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
          C: 'Gender',
          D: 'HomeTown',
          E: 'IdentityNumber',
          F: 'PhoneNumber',
        },
      },
    ],
  });

  if (excelData.Sheet1.length > 0) {
    if (isDate(excelData.Sheet1[0].DateOfBirth) === false) {
      return false;
    } else {
      for (let i = 0; i < excelData.Sheet1.length; i++) {
        const response = await fetch('http://localhost:3001/lecturer/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FullName: excelData.Sheet1[i].FullName,
            DateOfBirth: excelData.Sheet1[i].DateOfBirth,
            Sex: excelData.Sheet1[i].Gender,
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

export const getLecturerByEmail = async (req, res) => {
  //console.log(req.body);
  try {
    let lecturerEmail = req.body.email;
    let lecturerFind = await LecturerService.findLecturerByEmail(lecturerEmail);

    if (lecturerFind == null) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: apiStatus.INVALID_PARAM,
        message: 'Lecturer not found',
      });
    }
    return res.status(httpStatus.OK).json({
      status: apiStatus.SUCCESS,
      message: 'get lecture successfully',
      data: lecturerFind,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: apiStatus.OTHER_ERROR,
      message: e.message,
    });
  }
};
