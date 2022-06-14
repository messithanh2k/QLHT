import mongoose from "mongoose";

const lecturerSchema = mongoose.Schema({
    FullName: {
        type: String, 
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Sex: {
        type: String,
        required: true
    },
    Born: {
        type: String,
        required: true
    },
    IdentityNumber: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: String,
        required: true
    }
});

export const LecturerModel = mongoose.model('lecturers', lecturerSchema);