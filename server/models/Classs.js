import mongoose from "mongoose";

const classSchema = mongoose.Schema({
    ClassID: {
        type: String,
        required: true,
        unique: true
    },
    SubID: {
        type: String, 
        required: true
    },
    LecID: {
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
    Room: {
        type: String,
        required: true
    },
    MaxSV: {
        type: Number,
        required: true
    },
    Student: {
        type: Array,
        required: false
    },
});

export const ClassModel = mongoose.model('classes', classSchema);