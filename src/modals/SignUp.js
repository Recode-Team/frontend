import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

export const SignUp = ({ show, onHide }) => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailMsg, setEmailMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onEmailHandler = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (!emailRegEx.test(inputEmail)) {
      setEmailMsg("이메일의 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else{
      setEmailMsg("올바른 이메일 형식입니다.");
      setIsEmail(true);
    }
  }
  const onNameHandler = (e) => {
    const inputName = e.target.value;
    setName(inputName);

    if (inputName.length < 2 || inputName.length > 5) {
      setNameMsg("2글자 이상 5글자 이하로 입력하세요.");
      setIsName(false);
    } else {
      setNameMsg("사용 가능한 닉네임입니다.");
      setIsName(true);
    }
  }
  const onPasswordHandler = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    
    if (!passwordRegEx.test(inputPassword)) {
      setPasswordMsg("숫자, 영문자, 특수문자를 조합하여 8자리 이상 입력하세요.")
      setIsPassword(false);
    } else {
      setPasswordMsg("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  }
  const onPasswordConfirm = (e) => {
    const inputPasswordConfirm = e.target.value;
    setPasswordConfirm(inputPasswordConfirm);
    
    if (password !== inputPasswordConfirm) {
      setPasswordConfirmMsg("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMsg("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log('email:', email)
    console.log('name:', name)
    console.log('password:', password)

    fetch('http://localhost:27000/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log("결과: ", result))
      .catch(error => console.error(error));
}

  return (
    <Modal
      show = {show}
      onHide = {onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Container>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          회원가입
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control type="email" placeholder="이메일" value={email} onChange={onEmailHandler}/>
            <p align="right">{emailMsg}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control placeholder="닉네임" value={name} onChange={onNameHandler}/>
            <p align="right">{nameMsg}</p>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler}/>
            <p align="right">{passwordMsg}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={onPasswordConfirm} />
            <p align="right">{passwordConfirmMsg}</p>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={onSubmitHandler}>
          완료
        </Button>
        <Button onClick={onHide}>취소</Button>
      </Modal.Footer>
    </Container>
    </Modal>
  )
}

export default SignUp