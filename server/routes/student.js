import express from 'express'
import {getStudent, getStudentList, createStudentAccount, deleteStudent, updateStudent, uploadFile, getStudentTimetable} from '../controllers/student.js'
import multer from 'multer'
import { getClassDetail, registerClass } from '../controllers/student/register_class.js'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.get('/', getStudentList)

router.post('/create', createStudentAccount)

router.get('/:IdentityNumber', getStudent)

router.delete('/:Email', deleteStudent)

router.post('/update', updateStudent)

router.post('/upload',upload.single("upfile"), uploadFile);

router.post('/getclassdetail', getClassDetail)

router.post('/registerclass', registerClass)

router.get('/timetable/:email',getStudentTimetable)

export default router;
