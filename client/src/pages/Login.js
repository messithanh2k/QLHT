import './Login.css';
import { useState, useEffect, forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login(props) {
    const navigate = useNavigate();

    const role = props.role;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    async function handleLogin(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data['success'] === true) {
            localStorage.setItem('token', data['accessToken']);
            navigate('/' + role + '/home');
        }
        ///////
    }

    return (
        <section className="vh-100">
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    You are loginning with role {role}!
                </Alert>
            </Snackbar>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="study"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleLogin}>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                />
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                {/* Checkbox */}
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        defaultValue
                                        id="remember_checkbox"
                                    />
                                    <label className="form-check-label" htmlFor="remember_checkbox">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="form-footer text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                >
                                    Login
                                </button>
                                {role === 'student' && <Link to="/lecturer/login"> Are you a lecturer?</Link>}
                                {role === 'lecturer' && <Link to="/student/login"> Are you a student?</Link>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                {/* Copyright */}
                <div className="text-white mb-3 mb-md-0">__lam__ © 2022</div>
                {/* Copyright */}
            </div>
        </section>
    );
}

export default Login;
