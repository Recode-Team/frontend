import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './MinutesDetails.css';
// import './CollaborativeEditor.css';
import '../../style.css';

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
  }, [id]);

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
      <div className="minutes-editor">
        <div className="editor-header">
          <div className="circle-btn">
            <div className="red-c"></div>
            <div className="yellow-c"></div>
            <div className="green-c"></div>
          </div>
        </div>
        <div className="editor-title">
            <p className="editor-title-txt">{meeting.title}</p>
          </div>
          <div className="editor-container">
            <div className="editor-content">
              <textarea disabled
              className="editor-text"
              value={meeting.summary}
              style={{ height: 400 }}
              />
              {/* <ReactMarkdown className="editor-text">{meeting.summary}</ReactMarkdown> */}
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