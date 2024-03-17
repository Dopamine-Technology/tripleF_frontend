import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';

const RegisterButton = () => {
    const navigate=useNavigate();

    const handleRegister=()=>{

        navigate('/register');
    }
    return (  
         <Button className='Register-button' onClick={handleRegister} >
             <Link  className='Register-link'>Register now <FaArrowRightLong /></Link>
            </Button> 
         );
}
 
export default RegisterButton;