import { useState } from "react";
import { Button } from '@mui/material';

const classes = []

function RegisterClass(){
    const [hp, setHp] = useState('')
    const [hps, setHps] = useState([])
    const [error, setError] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        
        if (hp === ''){
            setError("Chưa nhập mã học phần")
        }
        else {
            if (hps.includes(hp)){
                setError('Mã học phần trùng lặp')
            }
            else{
                const response = await fetch('http://localhost:3001/student/getclassdetail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "SubID": hp
                    }),
                })
        
                const data = await response.json()
                if (data.success === true){
                    classes.push(data['sub'])
                    setHps(prev => [...prev, hp])
                    setError('')
                }
                else {
                    setError("Không tìm thấy mã học phần")
                }
            }
        }
        

        setHp('')
        
        
    }

    function handleDelete(event, index){
        classes.splice(index, 1)
        setHps(prev => prev.splice(index, 1))
    }

    async function handleSubmitRegister(event){

    }


    return (
        <>
            <h1>Đăng ký học tập</h1>
            <div>
                Mã HP đăng kí 
                <input
                    value={hp}
                    onChange={e => setHp(e.target.value)}
                 />
                <button onClick={handleSubmit}>Đăng ký</button>
                {error && <p style={{color : "red"}}>{error}</p>}
                <table className="table table-bordered table-sm">
                    <thead>
                    <tr>
                        <th>Mã học phần</th>
                        <th>Tên học phần</th>
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
                                <td>{classs.SubID}</td>
                                <td>{classs.SubName}</td>
                                <td>{classs.Day}</td>
                                <td>{classs.StartTime}</td>
                                <td>{classs.EndTime}</td>
                                <td>{classs.Class}</td>
                                <td>{classs.MaxSV}</td>
                                <td><Button onClick={(event)=>handleDelete(event, index)}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
                 <div class="col text-center">
                    <button className="btn-sm" onClick={handleSubmitRegister}>Gửi đăng ký</button>
                </div>
            </div>


        </>

    )
}

export default RegisterClass;