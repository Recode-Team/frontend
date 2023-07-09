import React, { useState, useEffect } from 'react';
import CreateGroup from '../modals/CreateGroup';
import folder from './icon/folder.png';
import './style.css';

const Group = () => {
    const ipAddress = process.env.REACT_APP_IP_ADDRESS;

    const [CreateOn, setCreateOn] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch(`${ipAddress}/api/group/`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
          },
        })
          .then(response => response.json())
          .then(result => {
            console.log("result:", result)
            setGroups(result);
          })
          .catch(error => {
            console.error(error);
          });
        }, []);
    
        console.log("groups:", groups);
        console.log("setGroups", setGroups);

return (
    <>
      <CreateGroup show={CreateOn} onHide={() => setCreateOn(false)} setGroups={setGroups} />
      <div className="responsive-wrapper">
        <div className="group-header">
          <h1 className="group-header-txt">My Group</h1>
          <button className="create-btn" onClick={() => setCreateOn(true)}>Create</button>
        </div>
        <div className="content-main">
          <div className="card-grid">
            {groups.map((groups, index) => (
              <article className="card" key={index}>
                <div className="card-header">
                  <div className="card-header-1">
                    <span className="card-header-2"><img className="card-header-3" alt="" src={folder} /></span>
                    <p className="card-header-4">{groups.name}</p>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-body-txt">{groups.comment}</p>
                </div>
                <div className="card-footer">
                  <a href="/boardlist">Enter the group</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  
}

export default Group;