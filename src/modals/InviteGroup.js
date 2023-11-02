import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Container } from 'react-bootstrap';
import './sign_style.css';

export const InviteGroup = ({ show, onHide, setGroups }) => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const { id } = useParams();

  const onEmailHandler = (event) => {
    const value = event.currentTarget.value;
    setEmail(value);
    setIsEmail(value.trim() !== '');
  };

  const onCreateHandler = (event) => {
    event.preventDefault();
    const newMember = {
      email: email,
      groupId: id,
      type: 'group',
    };
    console.log(newMember);

    fetch(`${ipAddress}/api/mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(newMember),
    })
      .then((response) => response.json())
      .then((result) => {
        setGroups((prevGroups) => [...prevGroups, newGroup]);
        setEmail();
        onHide();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container id="top-modal-wrap">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            팀원 초대
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="groupname"
                placeholder="초대할 팀원의 이메일"
                value={email}
                onChange={onEmailHandler}
              />
            </Form.Group>
          </Form>
          <div id="welcome-message"></div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="modal-btn"
            type="button"
            disabled={!isEmail}
            onClick={onCreateHandler}
          >
            완료
          </button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

export default InviteGroup;
