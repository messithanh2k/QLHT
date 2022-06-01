import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    SID: {
        type: String,
        required: true,
        unique: true
    },
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
    },
    SchoolYear: {
        type: Number,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    Sex: {
        type: String,
        required: true
    },
    Major: {
        type: String,
        required: true
    },
    Born: {
        type: String,
        required: true
    },
    IdentityNumber: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    }
});

export const StudentModel = mongoose.model('students', studentSchema);