import React from 'react'
import NavBar from '../components/Register/Navbar'
import Footer from '../components/Footer/Footer'
import RegisterForm from '../components/Register/RegisterForm'


function Register() {
  return (
    <div style={{overflowX:'hidden'}}>
      <NavBar />
       <RegisterForm />
      <Footer />
    </div>
  )
}

export default Register