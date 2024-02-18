import React from 'react';
import Logo from '../../assets/imgs/Logo.png'
import './LoadingScreen.css'

const LoadingScreen = () => {
    return(
    <div id='loading-wrapper'>
    <div id='loading-text'>
      <img src={Logo} alt='Steamhub Logo' width='50%'/>
    </div>
    <div id='loading-content'> </div>
  </div>)
}

export default LoadingScreen;