import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Main.css'; 
import { Link } from "react-router-dom";
import { LuRadioTower } from "react-icons/lu";
import image1 from "../../images/image5.jpg";



function Main() {
  return (
    <Container fluid className='main'>
      <Row className="ml-4">
        <Col md={6} className="text-right">
          <h1>Where Every <br /> <span className="highlight-text"> Tune </span>  <br/> Tells a Tale</h1>
          <p>Welcome to the ultimate destination for audio exploration. From chart-toppers to hidden gems, our radio app connects you with stories and songs that resonate with your soul.</p>
          <Button as={Link} to="/radio" id='browse-btn'>Browse Stations <LuRadioTower /> </Button>
        </Col>
        
        <Col md={6} className="text-center">
          <div className="image-container mx-auto">
            <img src={image1} className="image1 img-fluid" alt='image1' />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
