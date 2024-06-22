import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './Contact.css'; 

export default function Contact() {
  return (
    <Container fluid className='contact-container'>
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="text-center mb-4">
          <h2>Contact Us</h2>
          <p>Please feel free to reach out to us <br />  with any questions or feedback. We'll get back to you as soon as possible!</p>
        </div>
        <Form style={{ width: '80%' }}>
          <Form.Group className="mb-3" controlId="contactForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
          </Form.Group>
          <Form.Group className="d-grid">
            <button type="submit" className="btn-submit ">Submit</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
}
