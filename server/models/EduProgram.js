import mongoose from "mongoose";

const EduProgramSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    major: {
        type: String,
        required: true
    }
});

export const EduProgramModel = mongoose.model('EduPrograms', EduProgramSchema);