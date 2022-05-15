import mongoose from "mongoose"

const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const UserModel =  mongoose.model('users', SubjectSchema)
