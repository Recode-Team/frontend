import React from 'react';
// import groupStyle from './style_group';
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import folder from './icon/folder.png';
import Recording from './Video/Recording'

const Group = () => {
    // const gStyle = groupStyle();
    const navigate = useNavigate();
    const goToWhiteboard = () => {
        navigate('/whiteboard');
    }

    return(
        <>
            {/* <Container style={{ minHeight: "75vh" }}>
                <h1>내 프로젝트</h1>
                <button onClick={() =>
                    document.getElementById('pro1').style.visibility = 'visible'}>Create</button>
                
                <div >
                    <div>
                        <button id={"pro1"} onClick={() => goToWhiteboard(true)}>Project 1</button>
                    </div>
                </div>
            </Container> */}
            <div className="responsive-wrapper">
                <div className="group-header">
                    <h1 className="group-header-txt">My Group</h1>
                    <button className="create-btn">Create</button>
                </div>
                <div className="content-main">
                    <div className="card-grid">
                        <article className="card">
                            <div className="card-header">
                                <div className="card-header-1">
                                    <span className="card-header-2"><img className="card-header-3" alt="" src={folder} /></span>
                                    <p className="card-header-4">Re:code</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-body-txt">컴퓨터공학과 졸업작품 </p>
                            </div>
                            <div className="card-footer">
                                <a href="/board">View Board</a>
                            </div>
                        </article>
                        <article className="card">
                            <div className="card-header">
                                <div className="card-header-1">
                                    <span className="card-header-2"><img className="card-header-3" alt="" src={folder} /></span>
                                    <p className="card-header-4">Apple</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-body-txt">사과 담기 게임 개발 </p>
                            </div>
                            <div className="card-footer">
                                <a href="/board">View Board</a>
                            </div>
                        </article>
                        <article className="card">
                            <div className="card-header">
                                <div className="card-header-1">
                                    <span className="card-header-2"><img className="card-header-3" alt="" src={folder} /></span>
                                    <p className="card-header-4">Market</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-body-txt">중고 거래 앱 프로젝트 </p>
                            </div>
                            <div className="card-footer">
                                <a href="/board">View Board</a>
                            </div>
                        </article>
                        <article className="card">
                            <div className="card-header">
                                <div className="card-header-1">
                                    <span className="card-header-2"><img className="card-header-3" alt="" src={folder} /></span>
                                    <p className="card-header-4">Play</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-body-txt">음악 추천 사이트 만들기 </p>
                            </div>
                            <div className="card-footer">
                                <a href="/board">View Board</a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Group;