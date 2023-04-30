
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AppIcon from '../../utils/fpl-wrapped-logo.png';
import './NavbarWrapper.css';

const NavbarWrapper = () => {
    return (
      <Navbar fixed="top" expand="lg" bg="dark" variant="dark" className='home-navbar'>
        <Container fluid>
        <Navbar.Brand href="/" className='full-title-text'>
              <img
                alt="fpl-wrapped-logo"
                src={AppIcon}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Fantasy Premier League - Wrapped   
        </Navbar.Brand>
        <Navbar.Brand href="/" className='short-title-text'>
              <img
                alt="fpl-wrapped-logo"
                src={AppIcon}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              FPL - Wrapped  
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
        <Nav className="me-auto">
            <Nav.Link href="/about">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default NavbarWrapper;
