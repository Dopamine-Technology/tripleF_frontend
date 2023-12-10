import React from 'react';
import { Button } from 'react-bootstrap';
import { FaLongArrowAltRight,FaLongArrowAltLeft } from "react-icons/fa";

const ClientTalk = () => {
    return ( <div className='bg-gray mb-4' >
        <h1 className='who-h1 p-5' >What people are saying</h1>
        <p className='m-3' style={{width:'30rem'}} >
        <span style={{fontSize:'4rem',color:'#1A2A44'}} className='talkQ'>“</span>
        <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute.
               <br />
             
               -Mila Mila
               <br />
               -freelance design
               

               </p>
               
            <div>
        <Button className='customButton ' style={{backgroundColor:'#213555'}}><FaLongArrowAltLeft  /></Button>
        <Button className='customButton ' style={{backgroundColor:'#213555'}} ><FaLongArrowAltRight /></Button>
      </div>
            
    </div> );
}
 
export default ClientTalk;