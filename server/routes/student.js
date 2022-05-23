import express from 'express'
import {getStudent, getStudentList, createStudentAccount, deleteStudent} from '../controllers/student.js'

const router = express.Router()

router.get('/', getStudentList)

router.post('/create', createStudentAccount)

router.get('/:IdentityNumber', getStudent)

router.delete('/:Email', deleteStudent)

export default router;
