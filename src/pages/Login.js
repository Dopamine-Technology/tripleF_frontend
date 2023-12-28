import React from 'react'
import LoginForm from '../components/Login/LoginFom';
import Footer from '../components/Footer/Footer'
import CombinedNavbars from '../components/Register/Navbar';

function Login() {
    return (
      <div style={{overflowX:'hidden'}}>
       <CombinedNavbars />
       <LoginForm />
       <Footer />
      </div>
    )
  }
  
  export default Login;