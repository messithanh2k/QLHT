import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/home';
import Account from './Accounts/StudentsAccount';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/accounts" element={<Account />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
