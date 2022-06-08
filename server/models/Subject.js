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
    Day: {
        type: String,
        required: true
    },
    StartTime: {
        type: Number,
        required: true,
    },
    EndTime: {
        type: Number,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    MaxSV: {
        type: Number,
        required: true
    },
});

export const SubjectModel = mongoose.model('subjects', subjectSchema);