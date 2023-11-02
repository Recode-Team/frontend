import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Container } from 'react-bootstrap';
import './sign_style.css';

export const CreateBoard = ({ show, onHide, setBoards }) => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [boardName, setBoardName] = useState('');
  const [boardComment, setBoardComment] = useState('');

  const [isBoardName, setIsBoardName] = useState(false);
  const [isBoardComment, setIsBoardComment] = useState(false);

  const { id } = useParams();

  const onNameHandler = (event) => {
    const value = event.currentTarget.value;
    setBoardName(value);
    setIsBoardName(value.trim() !== '');
  };
  const onCommentHandler = (event) => {
    const value = event.currentTarget.value;
    setBoardComment(value);
    setIsBoardComment(value.trim() !== '');
  };

  const onCreateHandler = (event) => {
    event.preventDefault();
    const newBoard = {
      id: id,
      boardname: boardName,
      boardcomment: boardComment,
    };

    fetch(`${ipAddress}/api/board/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(newBoard),
    })
      .then((response) => response.json())
      .then((result) => {
        setBoards((prevBoards) => [...prevBoards, newBoard]);
        onHide();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <Container id="top-modal-wrap">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">보드 만들기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="boardname"
                placeholder="보드 이름"
                value={boardName}
                onChange={onNameHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="boardcomment"
                placeholder="보드 설명"
                value={boardComment}
                onChange={onCommentHandler}
              />
            </Form.Group>
          </Form>
          <div id="welcome-message"></div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="modal-btn"
            type="button"
            disabled={!isBoardName || !isBoardComment}
            onClick={onCreateHandler}
          >
            완료
          </button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

export default CreateBoard;
