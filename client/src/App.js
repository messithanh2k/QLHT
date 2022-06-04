import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import Account from './Accounts/StudentsAccount';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
