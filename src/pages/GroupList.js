import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateGroup from '../modals/CreateGroup';
import folder from './icon/folder.png';
import trash from './icon/trash.png';
import Swal from 'sweetalert2';
import './style.css';

const GroupList = () => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [CreateOn, setCreateOn] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`${ipAddress}/api/group/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setGroups(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ipAddress]);

    // 삭제 기능
    const deleteGroup = (groupIndex) => {
      const updatedGroups = [...groups];
      updatedGroups.splice(groupIndex, 1);
      setGroups(updatedGroups);
      Swal.fire('삭제 완료!', '그룹이 성공적으로 삭제되었습니다.', 'success');
    };

  return (
    <>
      <CreateGroup show={CreateOn} onHide={() => setCreateOn(false)} setGroups={setGroups} />
      <div className="responsive-wrapper">
        <div className="group-header">
          <h1 className="group-header-txt">My Group</h1>
          <button className="create-btn" onClick={() => setCreateOn(true)}>
            Create
          </button>
        </div>
        <div className="content-main">
          <div className="card-grid">
            {groups.length > 0 ? (
              groups.map((group) => (
                <article className="card">
                  <React.Fragment key={group.id}>
                    <div className="card-header">
                      <div className="card-header-1">
                        <span className="card-header-2">
                          <img className="card-header-3" alt="" src={folder} />
                        </span>
                        <p className="card-header-4">{group.groupname}</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-body-txt">{group.groupcomment}</p>
                    </div>
                    <div className="card-footer">
                      <Link to={`/boardlist/${group.id}`}>Enter the group</Link>
                      {/* 삭제 버튼 */}
                      <button className="delete-button" onClick={() => deleteGroup(group.id)}>
                        <img width="50px" height="50px" alt="" src={trash}/>
                      </button>
                    </div>
                  </React.Fragment>
                </article>
              ))
            ) : (
              <p>No group</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupList;
