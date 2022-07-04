import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    SID: {
        type: String,
        required: true,
        unique: true
    },
    Classes: [
        {
            ClassID: String,
            Score: {type: Number, default: -1}
        }
    ]
});

export const CourseModel = mongoose.model('courses', CourseSchema);
