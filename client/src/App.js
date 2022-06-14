import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/home';
import StudentAccount from './Accounts/Students/StudentsAccount';
import LecturertAccount from './Accounts/Lecturers/LecturerAccount';
import Subject from './Subject/SubjectList'
import Timetable from './pages/student/Timetable';
import Result from './pages/student/Result';
import RegisterClass from './pages/student/RegisterClass';
import EduProgram from './pages/student/EduProgram';
//  a0b337e8c685cc41b686c2136b2a9b531e2bc5c7

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home role="" />}></Route>
                <Route path="/student/home" element={<Home role="student" />}></Route>
                <Route path="/lecturer/home" element={<Home role="lecturer" />}></Route>
                <Route path="/admin/home" element={<Home role="admin" />}></Route>
                <Route path="/student/login" element={<Login role="student" />}></Route>
                <Route path="/admin/login" element={<Login role="admin" />}></Route>
                <Route path="/lecturer/login" element={<Login role="lecturer" />}></Route>
                <Route path="/accounts/students" element={<StudentAccount />}></Route>
                <Route path="/accounts/lecturers" element={<LecturertAccount />}></Route>
                <Route path="/subjects" element={<Subject />}></Route>
                <Route path="/student/timetable" element={<Home role="student"><Timetable></Timetable></Home>}></Route>
                <Route path="/student/result" element={<Home role="student"><Result></Result></Home>}></Route>
                <Route path="/student/registerclass" element={<Home role="student"><RegisterClass></RegisterClass></Home>}></Route>
                <Route path="/student/eduprogram" element={<Home role="student"><EduProgram></EduProgram></Home>}></Route>
            </Routes>
        </Router>
    );

}

export default App;
