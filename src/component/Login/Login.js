import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import loginImage from '../../images/image3.jpg'; 
import './Login.css';


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Failed to sign in');
        }

        setLoading(false);
    }

    return (
        <Container fluid id="login-container">
            <Row className="align-items-stretch">
                <Col sm={8} className="login-form" style={{ height: "100%" }}>
                    <Card className="card" style={{ height: "100%"}}>
                        <Card.Body className="card-body">
                        <h2 >Log In</h2>
                        <p >To access your favorite radio stations and playlists.</p>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form className="login-form" onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mb-4 mt-4" type="submit">
                                    Log In
                                </Button>
                            </Form>
                            <div className="text-center mt-2" >Forget password? <Link to="/">Recover Password</Link></div>
                            <div className="text-center mt-2" >Need an account? <Link to="/signup">Sign Up</Link></div>
                        </Card.Body>
                        
                    </Card>

                </Col>
                <Col sm={4} className="image-col" style={{ height: "100%" }}>
                    <Image  className="image-container" src={loginImage} fluid style={{ height: "100%"}} /> 
                </Col>
            </Row>
        </Container>
    );
}
