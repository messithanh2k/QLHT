import { useState } from "react";
import { Button } from '@mui/material';
import GmailService from "../../service/GmailService";


function RegisterClass(){
    const [hp, setHp] = useState('')
    const [hps, setHps] = useState([])
    const [maHps, setMaHps] = useState([])
    const [classes, setClasses] = useState([])
    const [error, setError] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        
        if (hp === ''){
            setError("Chưa nhập mã lớp đăng kí")
        }
        else {
            if (hps.includes(hp)){
                setError('Mã lớp trùng lặp')
            }
            else{
                const response = await fetch('http://localhost:3001/student/getclassdetail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "ClassID": hp
                    }),
                })
        
                const data = await response.json()
                if (data.success === true){
                    if (maHps.includes(data["classs"].SubID)){
                        setError("trùng mã học phần")
                    }
                    else{
                        setHps(prev => [...prev, hp])
                        setMaHps(prev => [...prev, data["classs"].SubID])
                        setClasses(prev => [...prev, data["classs"]])
                        setError('')
                    }

                }
                else {
                    setError("Không tìm thấy mã lớp")
                }
            }
        }
        
        setHp('')
        
        
    }

    function handleDelete(event, index){
        event.preventDefault()
        setClasses(classes.filter((item, idx) => idx !== index))
        setHps(hps.filter((item, idx) => idx !== index))
        setMaHps(maHps.filter((item, idx) => idx !== index))
    }

    async function handleSubmitRegister(event){
        event.preventDefault()
        const response = await fetch('http://localhost:3001/student/registerclass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": GmailService.getLocalGmail(),
                "classes": hps
            }),
        })
        const data = await response.json()
        if (data.success === true){
            setError("Gửi đăng kí thành công")
        }
        else {
            setError(data.message)
        }
    }


    return (
        <>
            <h1>Đăng ký học tập</h1>
            <div>
                Mã lớp đăng kí 
                <input
                    value={hp}
                    onChange={e => setHp(e.target.value)}
                 />
                <button onClick={handleSubmit}>Đăng ký</button>
                {error && <p style={{color : "red"}}>{error}</p>}
                <table className="table table-bordered table-sm">
                    <thead>
                    <tr>
                        <th>Mã lớp</th>
                        <th>Mã học phần</th>
                        <th>Giảng viên</th>
                        <th>Thứ</th>
                        <th>Giờ bắt đầu</th>
                        <th>Giờ kết thúc</th>
                        <th>Phòng học</th>
                        <th>Số lượng sinh viên</th>
                        <td>&nbsp;</td>
                    </tr>
                    </thead>
                    <tbody>
                        {classes.map((classs, index) => (
                            <tr key={index}>
                                <td>{classs.ClassID}</td>
                                <td>{classs.SubID}</td>
                                <td>{classs.LecID}</td>
                                <td>{classs.Day}</td>
                                <td>{classs.StartTime}</td>
                                <td>{classs.EndTime}</td>
                                <td>{classs.Room}</td>
                                <td>{classs.MaxSV}</td>
                                <td><Button onClick={(event)=>handleDelete(event, index)}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
                 <div className="col text-center">
                    <button className="btn-sm" onClick={handleSubmitRegister}>Gửi đăng ký</button>
                </div>
            </div>


        </>

    )
}

export default RegisterClass;
