import express from 'express'
import {getStudent, getStudentList, createStudentAccount, deleteStudent, updateStudent, uploadFile} from '../controllers/student.js'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.get('/', getStudentList)

router.post('/create', createStudentAccount)

router.get('/:IdentityNumber', getStudent)

router.delete('/:Email', deleteStudent)

router.post('/update', updateStudent)

router.post('/upload',upload.single("upfile"), uploadFile);
export default router;
