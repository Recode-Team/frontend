import React from 'react';
import { useNavigate } from "react-router-dom";
import groupStyle from './style';

// import { colors } from '@material-ui/core';
// import { isVisible } from '@testing-library/user-event/dist/utils';

const Group = () => {
    const gStyle = groupStyle();

    const navigate = useNavigate();
    const goToWhiteBoard = () => {
      navigate('/whiteBoard');
    }

    return(
        <>
            <div>
                <h1 className={gStyle.myPJ}>내 프로젝트</h1>
                <button className={gStyle.cBtn} onClick={() =>
                    document.getElementById('pro1').style.visibility = 'visible'}>Create</button>
                
                <div className={gStyle.pjp}>
                    <div className={gStyle.ph}>
                        <button id={"pro1"} className={gStyle.pj} onClick={() => goToWhiteBoard(true)}>Project 1</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Group;