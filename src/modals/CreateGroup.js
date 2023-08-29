import React, { useState, useEffect } from 'react';
import { Modal, Form, Container } from 'react-bootstrap';
import './sign_style.css';

export const CreateGroup = ({ show, onHide, setGroups }) => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [groupName, setGroupName] = useState("");
  const [groupComment, setGroupComment] = useState("");
  
  const [isGroupName, setIsGroupName] = useState(false);
  const [isGroupComment, setIsGroupComment] = useState(false);

  const ongNameHandler = (event) => {
    const value = event.currentTarget.value;
    setGroupName(value);
    setIsGroupName(value.trim() !== "");
  }
  const onCommentHandler = (event) => {
    const value = event.currentTarget.value;
    setGroupComment(value);
    setIsGroupComment(value.trim() !== "");
  }

  const onCreateHandler = (event) => {
    event.preventDefault();
    const newGroup = {
      groupname: groupName,
      comment: groupComment
    };

    fetch(`${ipAddress}/api/group`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify(newGroup),
    })
      .then((response) => response.json())
      .then((result) => {
      setGroups((prevGroups) => [...prevGroups, newGroup]);
      // setGroups((prevGroups) => [...(prevGroups || []), newGroup]);
      onHide();
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <Modal
      show = {show}
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Container id="top-modal-wrap">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">그룹 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control type="groupname" placeholder="그룹 이름" value={groupName} onChange={ongNameHandler} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control type="groupcomment" placeholder="그룹 설명" value={groupComment} onChange={onCommentHandler} />
          </Form.Group>
        </Form>
        <div id="welcome-message"></div>
      </Modal.Body>
      <Modal.Footer>
        <button className="modal-btn" type="button" disabled={!isGroupName || !isGroupComment} onClick={onCreateHandler} >완료</button>
      </Modal.Footer>
    </Container>
    </Modal>
  )
}

export default CreateGroup