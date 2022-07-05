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

LecturerService.updateLecturer = async (email, lecturerRequest) => {
  let updateLecturer = await LecturerModel.findOneAndUpdate(
    { Email: email },
    lecturerRequest,
    { new: true }
  );
  if (!updateLecturer) {
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `Lecturer not found with id: ${email}`
    );
  }
  return updateLecturer;
};

export default LecturerService;
