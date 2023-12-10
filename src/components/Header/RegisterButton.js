import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RegisterButton = () => {
    return (  
         <Button   className='text-black border-2 p-2 ' style={{background:'#77DCBF',borderColor:'#77DCBF',borderRadius:'45px'}}>
             <Link to='/register'  style={{textDecoration:'none',color:'black'}}>Register now <FaArrowRightLong /></Link>
            </Button> 
         );
}
 
export default RegisterButton;