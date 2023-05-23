import React from 'react';
import groupStyle from './style_group';
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Group = () => {
    const gStyle = groupStyle();
    const navigate = useNavigate();
    const goToWhiteboard = () => {
        navigate('/whiteboard');
    }

    return(
        <>
            <Container style={{ minHeight: "75vh" }}>
                <h1 className={gStyle.myPJ}>내 프로젝트</h1>
                <button className={gStyle.cBtn} onClick={() =>
                    document.getElementById('pro1').style.visibility = 'visible'}>Create</button>
                
                <div className={gStyle.pjp}>
                    <div className={gStyle.ph}>
                        <button id={"pro1"} className={gStyle.pj} onClick={() => goToWhiteboard(true)}>Project 1</button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Group;