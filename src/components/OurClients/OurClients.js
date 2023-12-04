import React from 'react';
import {Row,Col} from 'react-bootstrap';
import ClientTalk from './ClientTalk';
import ClientImg from './ClientImg';
import './style.css';

const OurClients = () => {
    return (  <div className='bg-gray'>
        <Row>
            <Col><ClientTalk /></Col>
            <Col><ClientImg /></Col>
        </Row>
    </div> );
}
 
export default OurClients;