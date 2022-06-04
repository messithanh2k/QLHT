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
    const SID = 1955 + parseInt(req.body.SchoolYear) + s_max;
    const Email =  getEmail(req.body.FullName,SID.toString());
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

export const updateStudent = async(req,res) => {
    await StudentModel.findOneAndUpdate({SID: req.body.SID},req.body)
    res.status(200).json({success: true, message: "updated"});
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

function getEmail(fullname, sid){
    var split = fullname.split(' ');
    var email = '';
    if (split.length > 1) {
        email = removeVietnameseTones(split[split.length - 1]).toLowerCase() + '.';
        for (let i = 0 ; i<split.length-1 ; i++) {
            email += split[i][0].toLowerCase();
        }
    }
    return email + sid.slice(2) + '@sis.hust.edu.vn';   
}