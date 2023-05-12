import React, { useState } from 'react'
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  return (
    <>
    <header>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><h3>회의록 생성</h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse class="nav navbar-nav navbar-right" id="basic-navbar-nav" >
                    <Nav className="me-auto">
                    <Nav.Link>
                            {/* <Button class="btn btn-outline-primary">
                                내 프로젝트
                            </Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button class="btn btn-outline-primary">
                                로그아웃
                            </Button> */}
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