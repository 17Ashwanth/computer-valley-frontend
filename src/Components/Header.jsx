import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';


function Header() {

  const navigate = useNavigate()
  const {isAuthenticated, setIsAuthenticated} = useContext(isAuthTokenContext)

 
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existsUser")
    navigate('/')
    setIsAuthenticated(false)

  } 
  return (
    <>
            <div className='header-body text-decoration-none'>
            <Navbar style={{backgroundColor:'black'}} expand="lg">
            <Container>
            <Navbar.Brand className='ms-3 text-white' href="/"><i style={{color:'white'}} className="fa-brands fa-stack-overflow fs-1 me-2"></i>USER FORM SUBMITION PLATFORM</Navbar.Brand>        
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" d-flex align-items-center ms-4">
           
             <Nav.Link>
            <Link to={'/'}> <Button  onClick={handleLogout} className='btn btn-light me-5'  type="">Log Out</Button></Link> 
            </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>
    </>
  )
}

export default Header