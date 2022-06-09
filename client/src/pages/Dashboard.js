import { Navigate } from 'react-router-dom';

function Dashboard(){
    let accessToken = localStorage.getItem('token')
    if (accessToken)
        return (
            <div>Trang chủ</div> 
        )
    else 
        return <Navigate to="/login" />
}

export default Dashboard;
