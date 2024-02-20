// import React from 'react';
// import Logo from '../../assets/imgs/Logo.png'
// import './LoadingScreen.css';
// import { BounceLoader } from 'react-spinners';

// const LoadingScreen = () => {
//     return(
//     <div id='loading-wrapper'>
//     <div id='loading-text'>
//       <img src={Logo} alt='Steamhub Logo' />
//       {/* <BounceLoader /> */}
//     </div>
//     <div id='loading-content'> </div>
//   </div>
  
//   )
// }

// export default LoadingScreen;

import React from 'react';
import Logo from '../../assets/imgs/Logo.png'
import './LoadingScreen.css';
import { BounceLoader } from 'react-spinners';

const LoadingScreen = () => {
    return(
<div className="loader-wrapper">
          <BounceLoader color="#36d7b7" />
        </div>
  
  )
}

export default LoadingScreen;