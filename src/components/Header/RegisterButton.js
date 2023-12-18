import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RegisterButton = () => {
    return (  
         <Button className='Register-button'>
             <Link to='/register' className='Register-link'>Register now <FaArrowRightLong /></Link>
            </Button> 
         );
}
 
export default RegisterButton;