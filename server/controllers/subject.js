import { SubjectModel } from "../models/Subject.js"

export const getSubjectList = async (req,res) => {
    SubjectModel.find((err,data)=>{
        if (err) return console.error(err);
        res.status(200).json(data.map(obj=> ({...obj})));
    });
}

export const createSubjectAccount = async (req,res) => {
    const subject = new SubjectModel({
        SubID: req.body.SubID,
        SubName: req.body.SubName,
        Day: req.body.Day,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime,
        Class: req.body.Class,
        MaxSV: req.body.MaxSV,
    });
    await subject.save((err,data)=>{
        if (err) {res.status(400).json({success: false, message: "error found"});
                console.log(subject);
    }
        else {
            res.status(201).json({success: true, message: "created in database",SubID: data.SubID, SubName: data.SubName,Day: data.Day, Class: data.Class, StartTime: data.StartTime, EndTime:data.EndTime, MaxSV:data.MaxSV});
            
        }
    });
}

export const deleteSubject = async(req,res) => {
    const SubID = req.params.SubID;

    const subject = await SubjectModel.findOneAndDelete({SubID: SubID});
    if (subject) res.status(200).json({success: true, message: "Delete " + subject.SubID + " Successfully"});
    else res.status(400).json({success: false, message: "error found"});
    
}

export const updateSubject = async(req,res) => {
    await SubjectModel.findOneAndUpdate({SubID: req.body.SubID},req.body)
    res.status(200).json({success: true, message: "updated"});
}


