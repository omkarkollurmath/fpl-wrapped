import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Aditya from './../../utils/amod.jpg'
import Amod from './../../utils/amod.jpg'
import Omkar from './../../utils/amod.jpg'
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
                  <div>CSO</div>
                  <div style={{marginTop: "4%", display: "flex", justifyContent: "space-around"}}>
                    <img src={LinkedIn} alt="LinkedIn"/>
                    <img src={Instagram} alt="Instagram"/>
                  </div>
                </div>
              </Col>
              <Col sm style={{maxWidth: "fit-content", paddingTop: '2%'}}>
              <div>
                <img src={Amod} alt="Amod Sahasrabudhe"/>
                <div><b>Amod Sahasrabudhe</b></div>
                <div>Data Scientist</div>
                <div style={{marginTop: "4%", display: "flex", justifyContent: "space-around"}}>
                  <img src={LinkedIn} alt="LinkedIn"/>
                  <img src={Instagram} alt="Instagram"/>
                  <img src={Twitter} alt="Twitter"/>
                </div>
              </div>
              </Col>
              <Col sm style={{maxWidth: "fit-content", paddingTop: '2%'}}>
              <div>
                <img src={Omkar} alt="Omkar Kollurmath"/>
                <div><b>Omkar Kollurmath</b></div>
                <div>Software Developer</div>
                <div style={{marginTop: "4%", display: "flex", justifyContent: "space-around"}}>
                  <img src={LinkedIn} alt="LinkedIn"/>
                  <img src={Instagram} alt="Instagram"/>
                  <img src={Twitter} alt="Twitter"/>
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