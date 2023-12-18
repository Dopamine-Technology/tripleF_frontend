import React from 'react'
import NavBar from '../components/Register/Navbar';
import LoginForm from '../components/Login/LoginFom';

function Login() {
    return (
      <div style={{overflowX:'hidden'}}>
       <NavBar />
       <LoginForm />
      </div>
    )
  }
  
  export default Login;