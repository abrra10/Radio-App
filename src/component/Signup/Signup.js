import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SigninImage from '../../images/image4.jpg'; 
import Image from 'react-bootstrap/Image';
import './Signup.css';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);

        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
        <Container fluid id="signup-container">
            <Row>
                <Col sm={4}>
                    <Image className="image-container" src={SigninImage} fluid  style={{ height: "100%"  }}/>
                </Col>
                <Col sm={8} className="signup-form">
                    <Card className="card">
                        <Card.Body className="card-body">
                            <h2>Sign Up</h2>
                            <p >Start exploring with your new account today</p>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-4" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                            <div className="text-center mt-2">
                                Already have an account? <Link to="/login">Log In</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
