import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import { SubjectModel } from '../models/Subject.js';
import { ClassModel } from '../models/Classs.js';

const SubjectService = {};

SubjectService.getSubNameBySubID = async (SubID) => {
  let subject = SubjectModel.findOne({ SubID: SubID });
  //console.log(lecturer);
  if (!subject) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      apiStatus.DATABASE_ERROR,
      `subject not found with ID: ${SubID}!`
    );
  }
  return subject.SubName;
};

export default SubjectService;
