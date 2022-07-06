import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import { StudentModel } from '../models/Student.js';
import { UserModel } from '../models/User.js';
import { ClassModel } from '../models/Classs.js';

const StudentService = {};

StudentService.findStudentByEmail = async (email) => {
  let student = await StudentModel.findOne({ Email: email });
  //console.log(student);
  if (!student) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `student not found with email: ${email}!`
    );
  }
  return student;
};

StudentService.updateStudent = async (email, studentRequest) => {
  let updateStudent = await StudentModel.findOneAndUpdate(
    { Email: email },
    studentRequest,
    { new: true }
  );
  if (!updateStudent) {
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `student not found with email: ${email}`
    );
  }
  return updateStudent;
};
export default StudentService;
