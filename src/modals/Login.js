import React from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

export const Login = ({ show, onHide }) => {
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
          로그인
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control type="id" placeholder="ID" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control type="password" placeholder="비밀번호" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button">
          완료
        </Button>
        <Button onClick={onHide}>취소</Button>
      </Modal.Footer>
    </Container>
    </Modal>
  )
}

export default Login