import React from 'react';
// import groupStyle from './style_group';
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Group = () => {
    // const gStyle = groupStyle();
    const navigate = useNavigate();
    const goToWhiteboard = () => {
        navigate('/whiteboard');
    }

    return(
        <>
            <Container style={{ minHeight: "75vh" }}>
                <h1>내 프로젝트</h1>
                <button onClick={() =>
                    document.getElementById('pro1').style.visibility = 'visible'}>Create</button>
                
                <div >
                    <div>
                        <button id={"pro1"} onClick={() => goToWhiteboard(true)}>Project 1</button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Group;