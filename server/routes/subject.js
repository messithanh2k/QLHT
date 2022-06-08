import express from 'express'
import {getStudent, getStudentList, createStudentAccount, deleteStudent, updateStudent} from '../controllers/student.js'
import { getSubjectList,createSubjectAccount, deleteSubject, updateSubject} from '../controllers/subject.js'
const router = express.Router()

router.get('/', getSubjectList)

router.post('/create', createSubjectAccount)

router.get('/:IdentityNumber', getStudent)

router.delete('/delete/:SubID', deleteSubject)

router.post('/update', updateSubject)

export default router;
