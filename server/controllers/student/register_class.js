import { SubjectModel } from "../../models/Subject.js"

export const getClassDetail = async (req, res) => {
    const {SubID} = req.body
    try {
        const sub = await SubjectModel.findOne({ SubID })
        if (!sub)
            return res.status(400).json({success:false, message: 'Không tìm thấy mã học phần'})
        return res.json({success:true, sub})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}