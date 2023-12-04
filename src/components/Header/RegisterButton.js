import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";

const RegisterButton = () => {
    return (  
         <Button variant="success"  className='text-black border-2 success '>Register now <FaArrowRightLong /></Button> 
         );
}
 
export default RegisterButton;