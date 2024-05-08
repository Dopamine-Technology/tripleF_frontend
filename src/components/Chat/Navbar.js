import React from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { Row,Col,Container } from 'react-bootstrap';
import New from '../../assets/imgs/new.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate();

  const handleNewMessageClick = () => {
    navigate('/new-message'); // Redirect to new message page
  };

  return (
    <div className="mb-2">
      <Container>
        <Row>
          <Col >
      <p className='header-title'>Messaging</p>
         </Col>
         <Col >
    <div class="search-container " >
    <input type="text" placeholder="Search" class="search-input" />
    <AiOutlineSearch className="search-icon" />
    </div>
    </Col>
    <Col ></Col>
    <Col></Col>
    <Col>
    <button className='btn-tall' style={{width:'auto',padding:'0.5rem'}} onClick={handleNewMessageClick}>
                 <img src={New}  /> New Message
    </button>
    </Col>
    </Row>
    <hr style={{color:'#d3d7dd'}} />
    </Container>
    </div>
  );
}

export default Navbar;
