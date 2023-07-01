import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import MDEditor from '@uiw/react-md-editor';
import './CollaborativeEditor.css';
import '../../style.css';

const CollaborationComponent = () => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const { id } = useParams();
  const ydocRef = useRef(null);
  const ytextRef = useRef(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [editorHeight, setEditorHeight] = useState('300px');
  const navigate = useNavigate();
  const socketRef = useRef(null); // socket 변수 추가

  useEffect(() => {
    const ydoc = new Y.Doc();
    const ytext = ydoc.getText('codemirror');
    ytextRef.current = ytext;

    const socket = new WebSocket(`ws://localhost:2100/api/ws/${id}`);
    socketRef.current = socket; // socket 변수 저장

    socket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    socket.addEventListener('message', (event) => {
      const { clientId, message } = JSON.parse(event.data);
      if (clientId !== socketRef.current.clientId) {
        ytextRef.current.delete(0, ytextRef.current.length);
        ytextRef.current.insert(0, message);
        setText(message);
      }
    });

    fetch(`${ipAddress}/api/meeting-minutes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.results.minutes.title);
        ytextRef.current.delete(0, ytextRef.current.length);
        ytextRef.current.insert(0, data.results.minutes.summary);
        setText(data.results.minutes.summary);
      })
      .catch((error) => console.error('Failed to fetch meeting details:', error));

    const provider = new WebsocketProvider(
      `ws://localhost:2100/api/ws/${id}`,
      'demo-test-text',
      ydoc
    );

    ytext.observe((event) => {
      if (event.origin === 'local') {
        const updatedText = event.currentTarget.toString();
        setText(updatedText);
        const message = JSON.stringify({ clientId: socketRef.current.clientId, message: updatedText });
        socketRef.current.send(message); // 텍스트 업데이트 메시지 전송
      }
    });

    const handleResize = () => {
      setEditorHeight(`${window.innerHeight * 0.5}px`);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      socketRef.current.close(); // WebSocket 연결 종료
      window.removeEventListener('resize', handleResize);
    };
  }, [id, ipAddress]);

  const handleSetText = useCallback((updatedText) => {
    setText(updatedText);
    ytextRef.current.delete(0, ytextRef.current.length);
    ytextRef.current.insert(0, updatedText);
    const message = JSON.stringify({ clientId: socketRef.current.clientId, message: updatedText });
    socketRef.current.send(message); // 텍스트 업데이트 메시지 전송
  }, []);

  const handleSave = useCallback(() => {
    const updatedText = text;

    const requestBody = {
      title: title,
      minute: updatedText,
    };

    // API 호출하여 데이터베이스에 저장
    fetch(`${ipAddress}/api/meeting-minutes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response)
      .catch((error) => console.error('Failed to update meeting details:', error));
  }, [id, text, title, ipAddress]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    // 변경 이벤트 리스너 등록
    ytextRef.current.observe((event) => {
      setText(event.currentTarget.toString());
    });
  }, []);

  return (
    <div className="responsive-wrapper minutes-wrap">
      {/* 에디터 */}
      <div className="minutes-editor">
        <div className="editor-header">
          <div className="circle-btn">
            <div className="red-c"></div>
            <div className="yellow-c"></div>
            <div className="green-c"></div>
          </div>
        </div>
        <div className="editor-title">
          {/* <p className="editor-title-txt">{title}</p> */}
          <textarea className="editor-title-txt" value={title} style={{height:"36px"}}></textarea>
        </div>
        <div className="editor-container">
          <div id="editor-content">
            {/* <textarea
              className="editor-text"
              value={text}
              onChange={handleSetText}
            /> */}
            {/* <MDEditor
              className="editor-text"
              height={600}
              value={text}
              onChange={handleSetText}
            /> */}
          </div>
          <MDEditor className="editor-part"
            height={600}
            value={text}
            onChange={handleSetText}
          />
        </div>
      </div>
      {/* 버튼 */}
      <div className="footer">
        <button className="save-button" onClick={handleSave}>저장하기</button>
        <button className="go-back-button" onClick={handleGoBack}>뒤로가기</button>
      </div>
    </div>
  );
};

export default CollaborationComponent;