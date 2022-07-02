import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import { LecturerModel } from '../models/Lecturer.js';
import { UserModel } from '../models/User.js';

const LecturerService = {};

LecturerService.findLecturerByEmail = async (email) => {
  let lecturer = await LecturerModel.findOne({ Email: email });
  //console.log(lecturer);
  if (!lecturer) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `Lecturer not found with email: ${email}!`
    );
  }
  return lecturer;
};

export default LecturerService;
