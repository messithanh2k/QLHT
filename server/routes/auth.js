import express from 'express'
import { getAuth, Register, Login } from '../controllers/auth.js'
const router = express.Router()

router.get('/', getAuth)

router.post('/register', Register)
router.post('/login', Login)

export default router;
