import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useNavigate()

    async function handleLogin(event){
        event.preventDefault()

        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()
        
        console.log(data['success'])
        if (data['success'] === true){
          localStorage.setItem('token', data['accessToken'])
          history("/")
        }
        ///////
    }


    return (
        <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="study" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleLogin}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    id="email" 
                    className="form-control form-control-lg" 
                    placeholder="Enter a valid email address" 
                  />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    id="password" 
                    className="form-control form-control-lg" 
                    placeholder="Enter password" 
                  />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" defaultValue id="remember_checkbox" />
                    <label className="form-check-label" htmlFor="remember_checkbox">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">Forgot password?</a>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          {/* Copyright */}
          <div className="text-white mb-3 mb-md-0">
              __lam__ © 2022
          </div>
          {/* Copyright */}
        </div>
      </section>
    )
}

export default Login;
