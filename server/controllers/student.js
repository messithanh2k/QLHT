import { StudentModel } from "../models/Student.js"

export const getStudentList = async (req,res) => {
    StudentModel.find((err,data)=>{
        if (err) return console.error(err);
        res.status(200).json(data.map(obj=> ({...obj,Password: '123456'})));
    });
}


export const createStudentAccount = async (req,res) => {
    var count = 0;
    await StudentModel.countDocuments({}).then(d => count = d)
    var s_count = count.toString();
    while (s_count.length < 4) {
        s_count = '0' + s_count;
    }
    const SID = 1955 + parseInt(req.body.SchoolYear) + s_count
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
            res.status(201).json({success: true, message: "created in database",SID: data.SID, Email: data.Email, FullName: data.FullName});
            
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