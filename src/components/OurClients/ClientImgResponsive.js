import React, { useEffect } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Test1 from '../../assets/imgs/test1.png';
import Test2 from '../../assets/imgs/test2.png';
import Test3 from '../../assets/imgs/test3.png';
import Test4 from '../../assets/imgs/test4.png';
import Test5 from '../../assets/imgs/test5.png';
import Test6 from '../../assets/imgs/test6.png';
import { Image } from 'react-bootstrap';

const ClientImgResponsive = ({ onImageClick, selectedImageIndex,isSmallScreen }) => {
  const images = [
    Test1,
    Test2,
    Test3,
    Test4,
    Test5,
    Test6
  ];

  const handleClick = (index) => {
    onImageClick(index);
  };

  return (
    <div className="client-images">
      {images.map((image, index) => (
        <div key={index} className={`client-image ${selectedImageIndex === index && 'active'}`} onClick={() => handleClick(index)}>
          <Image src={image} fluid={isSmallScreen} width='42px' height='42px' />
        </div>
      ))}
    </div>
  );
};

export default ClientImgResponsive;