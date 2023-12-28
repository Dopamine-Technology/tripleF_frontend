import React, { useEffect } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

const ClientImg = ({ onImageClick, selectedImageIndex }) => {
  const images = [
    'https://cdn-useast1.kapwing.com/collections/video_image-VTnKjcRrV.jpeg?Expires=1703998806&GoogleAccessId=dev-sa-videoprocessing%40kapwing-dev.iam.gserviceaccount.com&Signature=n5PybUqGUhH6F85Bl0irjN8MGV%2BNuHqTiOdAO1EzBTMw%2FzhdqDEizr9pajN0n3FwAJi28aAk4Dr9Woo7rxeqUAlJBwHLO6Zws30H7eMyjJ%2FFsGyVHeEDedcbrYZHTdrWTBb0a0p0z1ThcVaZG15GbtoAS8Kb5di9t1TitmCxDfNlkV52WaqENiApY9e%2B1kv5V2SaHIHXAnpdmfctXwWRqbeuMN8M%2FHOaUpr8J9svIScBG2aRbj75MrNU9mrApezXksMXpBH8z1lzyhjy7WAIn0Ob1z9d%2Flo2X7gTxSykiwRiv58ugKW606VbI8iIowj4q5ikc%2F8IJSP6BzsTMrnsAA%3D%3D',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJzI8ssBFPVXkeOkmcjICIBOzX3dJf8Undxi0ixAsi_CciCXHhVjMc1LggcEkJvS10BGE&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBC9GBMM--i_8SSmRd_8edGERGCZfWGTeo9g60s9lgA85SS0Be2dQQPn5ipNLgg_hReeM&usqp=CAU',
    'https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-simple-background.jpg',
    'https://pub-static.fotor.com/assets/projects/pages/84fe33ff46c6427e852b50f201fe9b67/fotor-9af1359cc3874765aab876cc3d9871c3.jpg',
    'https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg'
  ];

  useEffect(() => {
    shuffleImages();
  }, []);

  const shuffleImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
  };

  const mainImageStyle = {
    width: '200px',
    height: '200px',
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
      width: index === 0 ? '80px' : index === 1 ? '60px' : index === 2 ? '120px' : '60px',
      height: index === 0 ? '80px' : index === 1 ? '60px' : index === 2 ? '120px' : '60px',
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
