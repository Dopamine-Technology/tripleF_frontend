import React from 'react'
import './style.css';
import CountDown from './Timer';
import Optin from './Option';
import Preloader from './Preloader';

function ComingSoon(){
    return(
  
        <div className="container">
          <h1 className='mt-5'>
 
            Coming Soon
          </h1>
          {/* <CountDown /> */}
          <Optin />
          <Preloader />
      
      </div>
    )
}
export default ComingSoon;