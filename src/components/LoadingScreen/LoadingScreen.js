import React from 'react';
import Logo from '../../assets/imgs/Logo.svg'
import './LoadingScreen.css'

const LoadingScreen = () => {
    return(
    <div id='loading-wrapper'>
    <div id='loading-text'>
      <img src={Logo} alt='Steamhub Logo' />
    </div>
    <div id='loading-content'>Please wait </div>
  </div>)
}

export default LoadingScreen;