import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateGroup from '../modals/CreateGroup';
import folder from './icon/folder.png';
import minus from './icon/minus.png';
import Swal from 'sweetalert2';
import './style.css';

const GroupList = () => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [CreateOn, setCreateOn] = useState(false);
  const [groups, setGroups] = useState([]);

  const token = localStorage.getItem('token');
  // 삭제 기능
  const deleteGroup = (groupId) => {
    fetch(`${ipAddress}/api/group/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.state === 'ok') {
          const updatedGroups = groups.filter((group) => group.id !== groupId);
          setGroups(updatedGroups);
          Swal.fire('삭제 완료!', '그룹이 성공적으로 삭제되었습니다.', 'success');
        } else {
          Swal.fire('(server)에러 발생!', '그룹 삭제 중 오류가 발생했습니다.', 'error');
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('(client)에러 발생!', '그룹 삭제 중 오류가 발생했습니다.', 'error');
      });

  };

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

  return (
    <>
      <CreateGroup
        show={CreateOn}
        onHide={() => setCreateOn(false)}
        setGroups={setGroups}
      />
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
                      <button
                        className="delete-button"
                        onClick={() => deleteGroup(group.id)}
                      >
                        <img width="30px" height="30px" alt="" src={minus} />
                      </button>
                    </div>
                    <div className="card-body">
                      <p className="card-body-txt">{group.groupcomment}</p>
                    </div>
                    <div className="card-footer">
                      <Link to={`/boardlist/${group.id}`}>Enter the group</Link>
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
