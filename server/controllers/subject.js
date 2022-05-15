import { UserModel } from '../models/User.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export const getSubject = (req, res) => {
    const {id} = req.body
}