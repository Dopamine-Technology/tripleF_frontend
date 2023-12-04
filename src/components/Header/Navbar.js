import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RegisterButton from './RegisterButton';


const NavBar = () => {
    return (    <Navbar collapseOnSelect expand="lg" className="bg-body-transparent">
    <Container>
      <Navbar.Brand href="#home" className='fs-4 text-white'>TripleF</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav>
          <Nav.Link href="#deets" className='text-white'>Home</Nav.Link>
          <Nav.Link href="#deets" className='text-white' >About Us</Nav.Link>
          <Nav.Link href="#deets" className='text-white'>Who is TripleF For</Nav.Link>
          <Nav.Link href="#deets" className='text-white'>How it works</Nav.Link>
          <Nav.Link href="#deets" className='text-white'>Contact us</Nav.Link>
          <Nav.Link href="#deets" className='text-white'> Blog</Nav.Link>
          <RegisterButton />
        
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar> );
}
 
export default NavBar;