import express from 'express';
import {
  getLecturerList,
  createLecturerAccount,
  deleteLecturer,
  updateLecturer,
  uploadFile,
  getLecturerByEmail,
  findOneAndUpdate,
  getClasses,
  getLecturerTimetable,
  getLecturerSub,
} from '../controllers/lecturer.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', getLecturerList);
router.post('/sub', getLecturerSub);

router.post('/create', createLecturerAccount);

// router.get('/:IdentityNumber', getStudent)

router.delete('/:Email', deleteLecturer);

router.post('/update', updateLecturer);

router.post('/upload', upload.single('upfile'), uploadFile);

router.post('/profile', getLecturerByEmail);

router.post('/update-profile', findOneAndUpdate);

router.post('/getClasses', getClasses);

router.post('/timetable', getLecturerTimetable);

export default router;
