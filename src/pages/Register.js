import React from 'react'
import NavBar from '../components/Register/Navbar'
import Footer from '../components/Footer/Footer'
import RegisterForm from '../components/Register/RegisterForm'
import CombinedNavbars from '../components/Register/Navbar'


function Register() {
  return (
    <div style={{overflowX:'hidden'}}>
      <CombinedNavbars />

       <RegisterForm />
      <Footer />
    </div>
  )
}

export default Register