import React from 'react';
import RegisterButton from './RegisterButton';
import {Row,Col} from 'react-bootstrap';

const HeaderDesc = () => {
    return ( <div className='header-div'>
        <h1 className='text-white text-left fw-bold fs-1' style={{ width: "30rem", fontSize: "3rem", letterSpacing: "2px" }}>What We Do In Life Echoes In Eternity</h1>
        <p className='text-white text-left' style={{width:"30rem"}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua incididunt ut labore et dolore magna aliqua</p>
        <RegisterButton />
       
     
        
    </div> );
}
 
export default HeaderDesc;