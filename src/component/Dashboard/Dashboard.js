import React, {useState} from 'react'
import { Card, Button, Alert, Nav, Navbar, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import Radio from "../Radio/Radio"
import "./Dashboard.css"



export default function Dashboard() {

  const [error, setError] = useState('')
  const { currentUser, logout} = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
     setError('')

     try{
        await  logout()
        navigate('/login')
     } catch{
         setError('Failed to log out')
     }
  }
  return (
   <>
    <Navbar bg="dark" data-bs-theme="dark" >
        <Container className="justify-content-center">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="justify-content-center" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/radio">Radio</Nav.Link>
          </Nav>
          <Button id="logout-btn" variant='link'  onClick={handleLogout}>Log Out</Button>
        </Container>
    </Navbar>

       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/radio" element={<Radio />} />
        </Routes>

    
    <Footer />

    
   </>
  )
}
