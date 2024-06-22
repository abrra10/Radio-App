import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import './Extra.css'; 
import logo1 from "../../logos/logo1.png";
import logo2 from "../../logos/logo2.png";
import logo3 from "../../logos/logo3.png";
import logo4 from "../../logos/logo4.png";
import logo5 from "../../logos/logo5.png";
import logo6 from "../../logos/logo6.png";
import logo7 from "../../logos/logo7.png";
import logo8 from "../../logos/logo8.png";
import logo9 from "../../logos/logo9.png";

function Extra() {
    return (
      <div id="extra">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="heading text-center">
                <h2 className='extra-h2'>Explore Different Radio Stations</h2>
                <p>Choose from a variety of radio stations tailored to your preferences, whether it's news, sports, music, or more.</p>
              </div>
            </Col>
          </Row>
        </Container>
        <Carousel fade >
          <Carousel.Item>
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo1} className="logo1" alt='logo1' />
              <img src={logo2} className="logo1" alt='logo2' />
              <img src={logo3} className="logo1" alt='logo3' />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo4} className="logo1" alt='logo4' />
              <img src={logo5} className="logo1" alt='logo5' />
              <img src={logo6} className="logo1" alt='logo6' />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo7} className="logo1" alt='logo7' />
              <img src={logo8} className="logo1" alt='logo8' />
              <img src={logo9} className="logo1" alt='logo9' />
            </div>
          </Carousel.Item>
          
        </Carousel>
      </div>
    );
  }
  
  export default Extra;