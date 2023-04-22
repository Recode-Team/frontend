import React, {useState} from 'react'
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignUp from '../modals/SignUp';
import Login from '../modals/Login';

const Header = () => {
  const [signUpOn, setSignUpOn] = useState(false);
  const [loginOn, setLoginOn] = useState(false);
  const navigate = useNavigate();
  const goToGroup = () => {
    navigate('/group');
  }
  return (
    <>
    <SignUp show={signUpOn} onHide={() => setSignUpOn(false)} />
    <Login show={loginOn} onHide={() => setLoginOn(false)} />
    <header>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>WHITE BOARD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Button variant="primary" onClick={() => setLoginOn(true)}>Login</Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button variant="primary" onClick={() => setSignUpOn(true)}>Sign Up</Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button variant="secondary" onClick={() => goToGroup(true)}>Group</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    </>
  )
};

export default Header