import express from 'express'
import {getLecturerList , createLecturerAccount} from '../controllers/lecturer.js'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.get('/', getLecturerList)

router.post('/create', createLecturerAccount)

// router.get('/:IdentityNumber', getStudent)

// router.delete('/:Email', deleteStudent)

// router.post('/update', updateStudent)

// router.post('/upload',upload.single("upfile"), uploadFile);
export default router;
