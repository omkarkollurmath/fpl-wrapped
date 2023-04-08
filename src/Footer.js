import React from "react";
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return (
        <footer>
            <Navbar className="justify-content-center text-center" fixed="bottom" bg="dark" variant="dark">
                <Navbar.Text>
                    Made with <span role="img" aria-label="heart-emoji">❤️️</span> by <span role="img" aria-label="panda-emoji">🐼</span>
                </Navbar.Text>
            </Navbar>
        </footer>
      );
}

export default Footer;