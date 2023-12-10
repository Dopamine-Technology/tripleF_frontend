import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RegisterButton from '../Header/RegisterButton';


const NavBar = () => {
    return (    <Navbar collapseOnSelect expand="lg" className="bg-body-transparent">
    <Container>
      <Navbar.Brand href="#home" className='fs-4 text-black'>TripleF</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav>
          <Nav.Link href="#deets" className='text-black'>Home</Nav.Link>
          <Nav.Link href="#deets" className='text-black' >About Us</Nav.Link>
          <Nav.Link href="#deets" className='text-black'>Who is TripleF For</Nav.Link>
          <Nav.Link href="#deets" className='text-black'>How it works</Nav.Link>
          <Nav.Link href="#deets" className='text-black'>Contact us</Nav.Link>
          <Nav.Link href="#deets" className='text-black'> Blog</Nav.Link>
          <RegisterButton />
        
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar> );
}
 
export default NavBar;