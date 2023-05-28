import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MinutesList.css';

function MinutesList() {
  const [meetingMinutes, setMeetingMinutes] = useState([]);
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    // fetch('http://127.0.0.1:27000/api/meeting-minutes')
    fetch(`${ipAddress}/api/meeting-minutes`)
      .then((response) => response.json())
      .then((data) => setMeetingMinutes(data.results.minutes))
      .catch((error) => console.error('Failed to fetch meeting minutes:', error));
  }, []);

  return (
    <div className="meeting-list-container">
      <h1>Minutes List</h1>
      <div className="bulletin-board">
        {meetingMinutes.length > 0 ? (
          meetingMinutes.map((meeting, index) => (
            <React.Fragment key={meeting.id}>
              <div className="bulletin">
                <div className="bulletin-header">
                  <h2 className="bulletin-title">
                    <Link to={`/meeting/${meeting.id}`} className="bulletin-link">
                      {meeting.title}
                    </Link>
                  </h2>
                  <span className="bulletin-date">{meeting.createdAt}</span>
                </div>
              </div>
              {index !== meetingMinutes.length - 1 && <hr className="bulletin-divider" />}
            </React.Fragment>
          ))
        ) : (
          <p>No meeting minutes available</p>
        )}
      </div>
    </div>
  );
}

export default MinutesList;
