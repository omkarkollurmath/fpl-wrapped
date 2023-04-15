
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AppIcon from './utils/fpl-wrapped-logo.png';

const NavbarWrapper = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>
              <img
                alt="fpl-wrapped-logo"
                src={AppIcon}
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
