import React,{useState} from 'react';
import {Row,Col} from 'react-bootstrap';
import ClientTalk from './ClientTalk';
import ClientImg from './ClientImg';
import './style.css';

const OurClients = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageChange = (index) => {
        setSelectedImageIndex(index);
       
      };
    return (  <div className='OurClientsWhole' >
        <Row>
            <Col><ClientTalk selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex}   /></Col>
            <Col><ClientImg  onImageClick={handleImageChange} selectedImageIndex={selectedImageIndex}/></Col>
        </Row>
    </div> );
}
 
export default OurClients;
