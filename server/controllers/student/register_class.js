import { ClassModel } from "../../models/Classs.js"
import { CourseModel } from "../../models/Course.js"

export const getClassDetail = async (req, res) => {
    const {ClassID} = req.body
    try {
        const classs = await ClassModel.findOne({ ClassID })
        if (!classs)
            return res.status(400).json({success:false, message: 'Không tìm thấy mã lớp'})
        return res.json({success:true, classs})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}

export const registerClass = async (req, res) => {
    const {email, classes} = req.body
    const Classes = classes.map(classs => ({ClassID: classs}))
    const course = new CourseModel({
        email: email,
        Classes: Classes
    });
    await course.save((err)=>{
        if (err) {
            console.log(err);
            return res.status(400).json({success: false, message: "error found"});    
        }
        else {
            return res.json({success: true, message: "course saved in database"});
        }
    });
}
