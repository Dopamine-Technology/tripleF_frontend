import React from 'react';
import boy from '../../assets/imgs/boy_play.png';
import football from '../../assets/imgs/football.png';


const AboutImg = () => {
    return (   <div className="image-container">
      {/* <img src={football} alt="Image 2" className=" image2" style={{marginRight:'1rem',width:'16rem',height:'38rem'}} />  */}
    <img src={football} alt="Image 2" className="me-1 image2" />
    <img src={boy} alt="Image 1" className="image1" />

  </div>);
}
 
export default AboutImg;