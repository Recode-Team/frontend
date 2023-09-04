import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postit from '../icon/postit.png';
import './MinutesList.css';
import '../style.css'

function MinutesList() {
  const [meetingMinutes, setMeetingMinutes] = useState([]);
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    fetch(`${ipAddress}/api/minutes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setMeetingMinutes(data.results.minutes))
      .catch((error) => console.error('Failed to fetch meeting minutes:', error));
  }, [ipAddress]);

  return (
    <>
    <div className="responsive-wrapper">
      <div className="minutes-header">
        <h1 className="group-header-txt">Minutes List</h1>
        <div className="content-main">
          <div className="card-grid">
              {meetingMinutes ? (
                meetingMinutes.map((meeting, index) => (
                  <article className="card">
                    <React.Fragment key={index}>
                    <div className="bulletin-title card-header">
                      <div className="card-header-1">
                        <span className="card-header-2"><img className="card-header-3" alt="" src={postit}></img></span>
                        <span className="card-header-4">{meeting.title.length > 14 ? meeting.title.slice(0, 15) + '...' : meeting.title}</span>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-body-txt">DATE {meeting.createdAt.slice(0, 10)} / TIME {meeting.createdAt.slice(11, 19)}</p>
                    </div>
                    <div className="card-footer">
                      <Link to={`/minutes/${meeting.id}`}>View Minutes</Link>
                    </div>
                    </React.Fragment>
                  </article>
                  ))
                ) : (
                <p>No meeting minutes available</p>
              )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default MinutesList;
