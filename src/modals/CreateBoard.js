import React, { useState } from 'react';
import { Modal, Form, Container } from 'react-bootstrap';
import './sign_style.css';

export const CreateBoard = ({ show, onHide, setGroups }) => {
//   const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [groupName, setGroupName] = useState("");
  const [groupInfo, setGroupInfo] = useState("");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

  const ongNameHandler = (event) => {
    setGroupName(event.currentTarget.value);
  }
  const ongInfoHandler = (event) => {
    setGroupInfo(event.currentTarget.value);
  }
    const onCreateHandler = (event) => {
        event.preventDefault();
        const newGroup = {
            name: groupName,
            info: groupInfo
        };
        setGroups((prevGroups) => [...prevGroups, newGroup]);

        onHide();
    }

  return (
    <Modal
      show = {show}
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Container id="top-modal-wrap">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">보드 추가하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            {/* <Form.Control type="id" placeholder="그룹 이름" value={email} onChange={onEmailHandler}/> */}
            <Form.Control type="groupname" placeholder="보드 이름" value={groupName} onChange={ongNameHandler} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            {/* <Form.Control type="password" placeholder="그룹 설명" value={password} onChange={onPasswordHandler}/> */}
            <Form.Control type="groupinfo" placeholder="그룹 설명" value={groupInfo} onChange={ongInfoHandler} />
          </Form.Group>
        </Form>
        <div id="welcome-message"></div>
      </Modal.Body>
      <Modal.Footer>
        {/* <button className="modal-btn" type="button" onClick={onSubmitHandler}>완료</button> */}
        <button className="modal-btn" type="button" onClick={onCreateHandler} >완료</button>
      </Modal.Footer>
    </Container>
    </Modal>
  )
}

export default CreateBoard