import React from 'react';
import { Button } from 'react-bootstrap';
import { FaLongArrowAltRight,FaLongArrowAltLeft } from "react-icons/fa";

const ClientTalk = () => {
    return ( <div className='bg-gray mb-4'>
        <h1 className='about-h1 p-5' style={{width:"50rem"}}>What people are saying</h1>
        <p className='about-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               <br />
               -Mila Mila
               -freelance design

               </p>
               
            <div>
        <Button className='customButton bg-black' ><FaLongArrowAltLeft /></Button>
        <Button className='customButton bg-black' ><FaLongArrowAltRight /></Button>
      </div>
            
    </div> );
}
 
export default ClientTalk;