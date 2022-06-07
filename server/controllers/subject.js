import { SubjectModel } from "../models/Subject.js"

export const getSubjectList = async (req,res) => {
    SubjectModel.find((err,data)=>{
        if (err) return console.error(err);
        res.status(200).json(data.map(obj=> ({...obj})));
    });
}