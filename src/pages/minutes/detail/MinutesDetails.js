import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import MDEditor from '@uiw/react-md-editor';
import './MinutesDetails.css';
// import './CollaborativeEditor.css';
import '../../style.css';

function MarkdownComponent({ markdownText }) {
  return (
    <ReactMarkdown plugins={[breaks]}>{markdownText}</ReactMarkdown>
  );
}

function MinutesDetails() {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;
  
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [editing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${ipAddress}/api/meeting-minutes/${id}`)
      .then((response) => response.json())
      .then((data) => setMeeting(data.results.minutes))
      .catch((error) => console.error('Failed to fetch meeting details:', error));
  }, [id, ipAddress]);

  const handleEditClick = () => {
    navigate(`/minutes/${id}/edit`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
    {meeting ? (
      <div className="responsive-wrapper minutes-wrap">
      <div className="minutes-detail">
        <div className="detail-header">
          <div className="circle-btn">
            <div className="red-c"></div>
            <div className="yellow-c"></div>
            <div className="green-c"></div>
          </div>
        </div>
        <div className="detail-title">
            <p className="detail-title-txt">{meeting.title}</p>
          </div>
          <div className="detail-container">
            <div className="detail-content">
              <MDEditor.Markdown className="detail-text"
		            style={{ padding: 10 }}
                source={meeting.summary}
              />
            </div>
          </div>
      </div>
      <div>
        <div className="footer">
          <button className="save-button" onClick={handleEditClick}>수정하기</button>
          <button className="go-back-button" onClick={handleGoBack}>뒤로가기</button>
        </div>
      </div>
    </div>
    ) : (
      <div >
        <p className="loading-message">Loading...</p>
    </div>
    )}
    </>
  );
}

export default MinutesDetails;