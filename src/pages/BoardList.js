import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreateBoard from '../modals/CreateBoard';
import pencil from './icon/pencil.png';
import trash from './icon/trash.png';
import Swal from 'sweetalert2';
import './style.css';

const BoardList = () => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;

  const [CreateOn, setCreateOn] = useState(false);
  const [boards, setBoards] = useState([]);

  const { id } = useParams();
  
  // 삭제 기능
  const deleteBoard = (boardIndex) => {
    const updatedBoards = [...boards];
    updatedBoards.splice(boardIndex, 1);
    setBoards(updatedBoards);
    Swal.fire('삭제 완료!', '보드가 성공적으로 삭제되었습니다.', 'success');
  };

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
      <CreateBoard show={CreateOn} onHide={() => setCreateOn(false)} setBoards={setBoards} />
      <div className="responsive-wrapper">
        <div className="group-header">
          <h1 className="group-header-txt">My Board</h1>
          <button className="create-btn" onClick={() => setCreateOn(true)}>
            Create
          </button>
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
                    </div>
                    <div className="card-body">
                      <p className="card-body-txt">{board.boardcomment}</p>
                    </div>
                    <div className="card-footer">
                      <Link to={`/board/${board.id}`}>Enter the board</Link>
                      {/* 삭제 버튼 */}
                      <button className="delete-button" onClick={() => deleteBoard(index)}>
                        <img width="50px" height="50px" alt="" src={trash}/>
                      </button>
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
