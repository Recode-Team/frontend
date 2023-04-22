import React, { useState } from 'react'
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import SignUp from '../modals/SignUp';
import Login from '../modals/Login';

const Header = () => {
  const [signUpOn, setSignUpOn] = useState(false);
  const [loginOn, setLoginOn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    setIsLogin(false);
  }
  
  return (
    <>
    <SignUp show={signUpOn} onHide={() => setSignUpOn(false)} />
    <Login show={loginOn} onHide={() => setLoginOn(false)} setIsLogin={setIsLogin}/>
    <header>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>OUR BOARD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {isLogin ? ( // 로그인 상태에 따라 분기처리
                        <Nav.Link>
                            <Button variant="primary" onClick={handleLogout}>
                                로그아웃
                            </Button>
                        </Nav.Link>
                    ) : (
                    <>
                        <Nav.Link>
                            <Button variant="primary" onClick={() => setLoginOn(true)}>
                                로그인
                            </Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button variant="primary" onClick={() => setSignUpOn(true)}>
                                회원가입
                            </Button>
                        </Nav.Link>
                    </>
                )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    </>
  )
};

export default Header