import { ClassModel } from "../models/Classs.js"

export const getClassList = async (req,res) => {
    ClassModel.find((err,data)=>{
        if (err) return console.error(err);
        res.status(200).json(data.map(obj=> ({...obj})));
    });
}

export const createClass = async (req,res) => {
    const classs = new ClassModel({
        SubID: req.body.SubID,
        ClassID: req.body.ClassID,
        LecID: req.body.LecID,
        Day: req.body.Day,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime,
        Room: req.body.Room,
        MaxSV: req.body.MaxSV,
    });
    await classs.save((err,data)=>{
        if (err) {res.status(400).json({success: false, message: "error found"});
                console.log(classs);
                console.log(err);
    }
        else {
            res.status(201).json({success: true, message: "created in database",SubID: data.SubID, ClassID: data.ClassID,LecID: data.LecID ,Day: data.Day, Class: data.Class, StartTime: data.StartTime, EndTime:data.EndTime, MaxSV:data.MaxSV});
            
        }
    });
}

export const deleteClass = async(req,res) => {
    const ClassID = req.params.ClassID;

    const classs = await ClassModel.findOneAndDelete({ClassID: ClassID});
    if (classs) res.status(200).json({success: true, message: "Delete " + classs.ClassID + " Successfully"});
    else res.status(400).json({success: false, message: "error found"});
    
}

export const updateClass = async(req,res) => {
    await ClassModel.findOneAndUpdate({ClassID: req.body.ClassID},req.body)
    res.status(200).json({success: true, message: "updated"});
}


