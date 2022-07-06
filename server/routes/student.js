import express from 'express';
import {
  getStudent,
  getStudentList,
  createStudentAccount,
  deleteStudent,
  updateStudent,
  uploadFile,
  getStudentTimetable,
  getStudentByEmail,
  findOneAndUpdate,
} from '../controllers/student.js';
import multer from 'multer';
import {
  getClassDetail,
  registerClass,
} from '../controllers/student/register_class.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', getStudentList);

router.post('/create', createStudentAccount);

router.get('/:IdentityNumber', getStudent);

router.delete('/:Email', deleteStudent);

router.post('/update', updateStudent);

router.post('/upload', upload.single('upfile'), uploadFile);

router.post('/getclassdetail', getClassDetail);

router.post('/registerclass', registerClass);

router.get('/timetable/:email', getStudentTimetable);

router.post('/profile', getStudentByEmail);

router.post('/update-profile', findOneAndUpdate);

export default router;
