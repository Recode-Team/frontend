import React, { useState } from 'react';
import { Modal, Form, Container } from 'react-bootstrap';
import SignUp from './SignUp';
import './sign_style.css';

export const Login = ({ show, onHide, setIsLogin, setShowLogin }) => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const user = { email: email, password: password };

    fetch(`${ipAddress}/api/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result: ", result);
        setIsLogin(true);
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = `환영합니다 ${result.results.name}님!`;
        onHide();
      })
      .catch(error => console.error(error));
  };

  const showSignUpModal = () => {
    onHide();
    setShowSignUp(true);
  };

  const hideSignUpModal = () => {
    setShowSignUp(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container id="top-modal-wrap">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              로그인
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control type="id" placeholder="이메일" value={email} onChange={onEmailHandler} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} />
              </Form.Group>
            </Form>
            <div id="welcome-message"></div>
          </Modal.Body>
          <Modal.Footer>
            <button className="modal-btn-move" onClick={showSignUpModal}>회원가입</button>
            <button className="modal-btn" type="button" onClick={onSubmitHandler}>완료</button>
          </Modal.Footer>
        </Container>
      </Modal>

      {showSignUp && (
        <SignUp show={showSignUp} onHide={hideSignUpModal} />
      )}
    </>
  );
};

export default Login