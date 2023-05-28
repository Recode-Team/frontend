import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './MinutesDetails.css';

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
    navigate(`/meeting/${id}/edit`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="meeting-details-container">
      <h1>Minutes Details</h1>
      {meeting ? (
        <div className="meeting-details">
          <h2>{meeting.title}</h2>
          <p>{meeting.summary}</p>
          <div className="minute">
            <ReactMarkdown>{meeting.minute}</ReactMarkdown>
          </div>
          <div className="button-container">
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
            <button className="back-button" onClick={handleGoBack}>Go Back</button>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading meeting details...</p>
      )}
    </div>
  );
}

export default MinutesDetails;