import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreateBoard from '../modals/CreateBoard';
import InviteGroup from '../modals/InviteGroup';
import plus from './icon/plus.png';
import pencil from './icon/pencil.png';
import minus from './icon/minus.png';
import Swal from 'sweetalert2';
import './style.css';

const BoardList = () => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [CreateOn, setCreateOn] = useState(false);
  const [boards, setBoards] = useState([]);
  const [inviteOn, setInviteOn] = useState(false);

  // 삭제 기능
  const deleteBoard = (boardId, index) => {
    fetch(`${ipAddress}/api/board/${boardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.state === 'ok') {
          const updatedBoards = [...boards];
          updatedBoards.splice(index, 1);
          setBoards(updatedBoards);
          Swal.fire('삭제 완료!', '보드가 성공적으로 삭제되었습니다.', 'success');
        } else {
          Swal.fire('(server)에러 발생!', '보드 삭제 중 오류가 발생했습니다.', 'error');
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('(client)에러 발생!', '보드 삭제 중 오류가 발생했습니다.', 'error');
      });
  };

  const { id } = useParams();

  useEffect(() => {
    fetch(`${ipAddress}/api/board/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setBoards(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, ipAddress]);

  return (
    <>
      <CreateBoard
        show={CreateOn}
        onHide={() => setCreateOn(false)}
        setBoards={setBoards}
      />
      <InviteGroup
        show={inviteOn}
        onHide={() => setInviteOn(false)}
        // setGroups={setGroups}
      />
      <div className="responsive-wrapper">
        <div className="group-header">
          <div className="group-name-s">
            <h1 className="group-header-txt">My Board</h1>
            <button className="invite-button" onClick={() => setInviteOn(true)}>
              <img width="40px" height="40px" alt="" src={plus} />
            </button>
          </div>
          <div>
            <button className="create-btn" onClick={() => setCreateOn(true)}>
              Create
            </button>
          </div>
        </div>
        <div className="content-main">
          <div className="card-grid">
            {boards.length > 0 ? (
              boards.map((board, index) => (
                <article className="card">
                  <React.Fragment key={index}>
                    <div className="card-header">
                      <div className="card-header-1">
                        <span className="card-header-2">
                          <img className="card-header-3" alt="" src={pencil} />
                        </span>
                        <p className="card-header-4">{board.boardname}</p>
                      </div>
                      {/* 삭제 버튼 */}
                      <button className="delete-button" onClick={() => deleteBoard(board.id, index)}>
                        <img width="30px" height="30px" alt="" src={minus} />
                      </button>
                      
                      {/* 삭제 버튼 */}
                      {/* <button
                        className="delete-button"
                        onClick={() => deleteBoard(index)}
                      >
                        <img width="30px" height="30px" alt="" src={minus} />
                      </button> */}
                    </div>
                    <div className="card-body">
                      <p className="card-body-txt">{board.boardcomment}</p>
                    </div>
                    <div className="card-footer">
                      <Link to={`/board/${board.id}`}>Enter the board</Link>
                    </div>
                  </React.Fragment>
                </article>
              ))
            ) : (
              <p>No board</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardList;
