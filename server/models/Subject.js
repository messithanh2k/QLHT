import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    SubID: {
        type: String,
        required: true,
        unique: true
    },
    SubName: {
        type: String, 
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Credit: {
        type: Number,
        required: true,
    },
});

export const SubjectModel = mongoose.model('subjects', subjectSchema);