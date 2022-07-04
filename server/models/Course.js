import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    type: {
        type: String, 
        required: true,
    },
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    term: {
        type: Number,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    complete: {
        type: Number,
        required: true
    },
    Mark: {
        type: String,
        required: true
    }
});

export const CourseModel = mongoose.model('Courses', CourseSchema);