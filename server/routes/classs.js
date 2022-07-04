import express from 'express'
import {getStudent, getStudentList, createStudentAccount, deleteStudent, updateStudent,getStudentInSubject} from '../controllers/student.js'
import { getClassList,createClass, deleteClass, updateClass, } from '../controllers/classs.js'
const router = express.Router()

router.get('/', getClassList)

router.post('/create', createClass)

router.get('/:IdentityNumber', getStudent)

router.delete('/delete/:ClassID', deleteClass)

router.post('/update', updateClass)

router.get('/getStudent/:Student', getStudentInSubject)

export default router;
