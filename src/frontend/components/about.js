import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Aditya from './../../utils/amod.jpg'
import Amod from './../../utils/amod.jpg'
import Omkar from './../../utils/omkar.jpg'
import Instagram from './../../utils/instagram.png'
import LinkedIn from './../../utils/linkedin.png'
import Twitter from './../../utils/twitter.png'
  
const AboutUs = () => {
  return (
    <div style={{margin: '5%'}}>
      <h2>About Us</h2>
      <div style={{paddingTop: '2%', paddingBottom: '2%'}}>
        <span>We are a group of friends who love building solutions and fun applications in our spare time. This is our first ever project that we are hosting live and
            we hope that you like it! Feel free to support us from the "Buy me a Coffee" page but do not feel obligied to do so!
        </span>
      </div>
      <div>
        <span>We'd appreciate if you share this project with your Fantasy Premier League friends!
        </span>
        <div style={{paddingTop: '2%', paddingBottom: '8%'}}>
          <h2>Developers</h2>
          <Container fluid>
            <Row style={{display: "inline-flex", justifyContent: "space-around", width: "100%"}}>
              <Col sm style={{maxWidth: "fit-content", paddingTop: '2%'}}>
                <div>
                  <img src={Aditya} alt="Aditya Zingade"/>
                  <div><b>Aditya Zingade</b></div>
                  <div style={{marginTop: "4%", display: "flex", justifyContent: "space-around"}}>
                    <a href="https://www.linkedin.com/in/aditya-z/" target="_blank" rel="noopener noreferrer">
                      <img src={LinkedIn} alt="LinkedIn"/>
                    </a>
                    <a href="https://www.instagram.com/aszingade2498/" target="_blank" rel="noopener noreferrer">
                      <img src={Instagram} alt="Instagram"/>
                    </a>
                  </div>
                </div>
              </Col>
              <Col sm style={{maxWidth: "fit-content", paddingTop: '2%'}}>
              <div>
                <img src={Amod} alt="Amod Sahasrabudhe"/>
                <div><b>Amod Sahasrabudhe</b></div>
                <div style={{marginTop: "4%", display: "flex", justifyContent: "space-around"}}>
                  <a href="https://www.linkedin.com/in/amod-sahasrabudhe/" target="_blank" rel="noopener noreferrer">
                    <img src={LinkedIn} alt="LinkedIn"/>
                  </a>
                  <a href="https://www.instagram.com/amod351998/" target="_blank" rel="noopener noreferrer">
                    <img src={Instagram} alt="Instagram"/>
                  </a>
                  <a href="https://twitter.com/amod3598" target="_blank" rel="noopener noreferrer">
                    <img src={Twitter} alt="Twitter"/>
                  </a>
                </div>
              </div>
              </Col>
              <Col sm style={{maxWidth: "fit-content", paddingTop: '2%'}}>
              <div>
                <img src={Omkar} alt="Omkar Kollurmath"/>
                <div><b>Omkar Kollurmath</b></div>
                <div style={{marginTop: "4%", display: "flex", justifyContent: "space-around"}}>
                  <a href="https://www.linkedin.com/in/omkar-kollurmath-204616184/" target="_blank" rel="noopener noreferrer">
                    <img src={LinkedIn} alt="LinkedIn"/>
                  </a>
                  <a href="https://www.instagram.com/ok12.3/" target="_blank" rel="noopener noreferrer">
                    <img src={Instagram} alt="Instagram"/>
                  </a>
                  <a href="https://twitter.com/OmkarKollurmath" target="_blank" rel="noopener noreferrer">
                    <img src={Twitter} alt="Twitter"/>
                  </a>
                </div>
              </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}
  
export default AboutUs;