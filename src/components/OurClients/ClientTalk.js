import React from 'react';
import { Button } from 'react-bootstrap';
import { FaLongArrowAltRight,FaLongArrowAltLeft } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";


const ClientTalk = () => {
    return ( <div className='bg-gray mb-4' >
        <h1 className='who-h1 mt-5 about-h1' style={{width:'36rem'}}>What people are saying</h1>
        <p className='m-3' style={{width:'30rem'}} >
        <span style={{fontSize:'4rem',color:'#1A2A44'}} className='talkQ'><FaQuoteLeft size={38} /></span>
        <br/>
        Leading an organization is incredibly rewarding and equally humbling. Confidence and humility. 
        Every success is built on lessons from mistakes made is incredibly rewarding and equally humbling. 
        It requires healthy.
               <br />
               <div className='mt-3'>
               <span style={{}}>
               - Mila McSabbu
               </span>
               <br />
               <span style={{color:'#464646'}}>
               Freelance Designer
               </span>
               </div>
               

               </p>
               
            <div>
        <Button className='customButton ' style={{backgroundColor:'#213555'}}><FaLongArrowAltLeft  /></Button>
        <Button className='customButton ' style={{backgroundColor:'#213555'}} ><FaLongArrowAltRight /></Button>
      </div>
            
    </div> );
}
 
export default ClientTalk;