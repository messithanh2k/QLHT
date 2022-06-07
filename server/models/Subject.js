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
        type: Date,
        required: true
    },
    StartTime: {
        type: Date,
        required: true,
    },
    EndTime: {
        type: Date,
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