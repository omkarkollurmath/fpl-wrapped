import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-bar">
            <Navbar className="justify-content-center text-center" fixed="bottom" bg="dark" variant="dark" style={{marginTop : `10%`}}>
                <Navbar.Text>
                We are not affiliated, associated, endorsed by, or in any way officially connected with the Premier League. All product and company names are trademarks™ or registered® trademarks of their respective holders
                </Navbar.Text>
            </Navbar>
        </footer>
      );
}

export default Footer;