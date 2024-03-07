import React, { useEffect } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import Test1 from '../../assets/imgs/test1.png';
import Test2 from '../../assets/imgs/test2.png';
import Test3 from '../../assets/imgs/test3.png';
import Test4 from '../../assets/imgs/test4.png';
import Test5 from '../../assets/imgs/test5.png';
import Test6 from '../../assets/imgs/test6.png';

const ClientImg = ({ onImageClick, selectedImageIndex }) => {
  const images = [
    Test1,
    Test2,
    Test3,
    Test4,
    Test5,
    Test6
  ];

  useEffect(() => {
    shuffleImages();
  }, []);

  const shuffleImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
  };

  const mainImageStyle = {
    width: '230px',
    height: '230px',
    borderRadius: '50%',
  };

  const thumbnailStyle = (index) => {
    const totalImages = images.length;
    const angle = (360 / totalImages) * index;
    const mainImageRadius = 200;

    const transformX =
      Math.cos((angle * Math.PI) / 180) * mainImageRadius - (index === selectedImageIndex ? 60 : 80);

    const transformY =
      Math.sin((angle * Math.PI) / 180) * mainImageRadius - (index === selectedImageIndex ? 60 : 80);

    return {
      width:'130px',
      height:'130px',
      borderRadius: '50%',
      marginTop: '5rem',
      marginRight: '13rem',
      transform: `translate(${transformX}px, ${transformY}px)`,
    };
  };

  const handleImageClick = (index) => {
    onImageClick(index);
  };

  return (
    <div className="client-img-container">
      <div className="main-image">
        <img
          src={images[selectedImageIndex]}
          alt={`Client ${selectedImageIndex + 1}`}
          style={mainImageStyle}
        />
      </div>
      <div className="thumbnail-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Client ${index + 1}`}
            className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
            onClick={() => handleImageClick(index)}
            style={thumbnailStyle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientImg;
