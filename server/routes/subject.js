import express from 'express'
import {getStudent, getStudentList, createStudentAccount, deleteStudent, updateStudent} from '../controllers/student.js'
import {getStudent, getStudentList, createStudentAccount, deleteStudent, updateStudent} from '../controllers/subject.js'
const router = express.Router()

router.get('/', getSubjectList)

router.post('/create', createStudentAccount)

router.get('/:IdentityNumber', getStudent)

router.delete('/:Email', deleteStudent)

router.post('/update', updateStudent)

export default router;
