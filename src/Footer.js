import React from "react";
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return (
        <footer>
            <Navbar className="justify-content-center text-center" fixed="bottom" bg="dark" variant="dark">
                <Navbar.Text>
                We are not affiliated, associated, endorsed by, or in any way officially connected with the Premier League. All product and company names are trademarks™ or registered® trademarks of their respective holders
                </Navbar.Text>
            </Navbar>
        </footer>
      );
}

export default Footer;