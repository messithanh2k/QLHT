import { StudentModel } from "../models/Student.js"

export const getStudentList = async (req,res) => {
    StudentModel.find((err,data)=>{
        if (err) return console.error(err);
        res.status(200).json(data.map(obj=> ({...obj})));
    });
}


export const createStudentAccount = async (req,res) => {
    var count = 0;
    await StudentModel.countDocuments({SchoolYear: req.body.SchoolYear}).then(d => count = d);
    var s_max;
    if (count === 0) {
        s_max = '0001';
    }
    else {
        await StudentModel.find({SchoolYear: req.body.SchoolYear})
                    .sort({SID: -1})
                    .then(d => s_max = (Number(d[0].SID.slice(4))+1).toString());
    }
    while (s_max.length < 4) {
        s_max = '0' + s_max;
    }
    const SID = 1955 + parseInt(req.body.SchoolYear) + s_max
    const Email =  SID.toString() + '@sis.hust.edu.vn';
    const student = new StudentModel({
        SID: SID.toString(),
        FullName: req.body.FullName,
        DateOfBirth: req.body.DateOfBirth,
        Email: Email,
        SchoolYear: req.body.SchoolYear,
        Class: req.body.Class,
        Sex: req.body.Sex,
        Major: req.body.Major,
        Born: req.body.Born,
        IdentityNumber: req.body.IdentityNumber,
        PhoneNumber: req.body.PhoneNumber
    });
    await student.save((err,data)=>{
        if (err) res.status(400).json({success: false, message: "error found"});
        else {
            res.status(201).json({success: true, message: "created in database",SID: data.SID, Email: data.Email, FullName: data.FullName, IdentityNumber: data.IdentityNumber});
            
        }
    });
}

export const getStudent = async (req,res) => {
    const IdentityNumber = req.params.IdentityNumber
    const student = await StudentModel.findOne({IdentityNumber: IdentityNumber})
    if (student) {
        res.status(200).json(student);
    }
    else {
        res.status(400).json({message: "error found"});
    }
}

export const deleteStudent = async(req,res) => {
    const Email = req.params.Email;

    const student = await StudentModel.findOneAndDelete({Email: Email});
    if (student) res.status(200).json({success: true, message: "Delete " + student.Email + " Successfully"});
    else res.status(400).json({success: false, message: "error found"});
    
}