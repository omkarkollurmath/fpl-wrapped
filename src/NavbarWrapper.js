
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavbarWrapper = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>
              <img
                alt="fpl-wrapped-logo"
                src="fpl-wrapped-logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Fantasy Premier League - Wrapped
            </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
  
  export default NavbarWrapper;
