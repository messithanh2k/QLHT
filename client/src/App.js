import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/home';
import Account from './Accounts/StudentsAccount';

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
                <Route path="/accounts" element={<Account />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
