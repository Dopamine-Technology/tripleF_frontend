import React from 'react'
import NavBar from '../components/Register/Navbar';
import LoginForm from '../components/Login/LoginFom';
import Footer from '../components/Footer/Footer'

function Login() {
    return (
      <div style={{overflowX:'hidden'}}>
       <NavBar />
       <LoginForm />
       <Footer />
      </div>
    )
  }
  
  export default Login;