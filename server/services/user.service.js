import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import { UserModel } from '../models/User.js';
import argon2 from 'argon2';

const UserService = {};

UserService.updatePassword = async (email, password) => {
  const hashPassword = await argon2.hash(password);

  let updateUser = await UserModel.findOneAndUpdate(
    { email: email },
    { password: hashPassword },
    { new: true }
  );
  if (!updateUser) {
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiStatus.DATABASE_ERROR,
      `User not found with email: ${email}`
    );
  }
  return updateUser;
};
export default UserService;
