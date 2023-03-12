import React from 'react';
import groupStyle from './style';
import { HiUserCircle } from "react-icons/hi";

const Group = () => {
    const gStyle = groupStyle();

    return(
        <div>
            <div className={gStyle.head}>
                <span className={gStyle.wb1}>WhiteBoard</span>
                <span className={gStyle.wbIcon}><HiUserCircle/></span>
                <span className={gStyle.wb2}>내프로젝트</span>
            </div>
            <div>
                <h1 className={gStyle.myPJ}>내 프로젝트</h1>
                <div className={gStyle.pjp}>
                    <div className={gStyle.ph}>
                        <div className={gStyle.pj}>A</div>

                    </div>
                    <div className={gStyle.ph}>
                        <div className={gStyle.pj}>A</div>

                    </div>
                    <div className={gStyle.ph}>
                        <div className={gStyle.pj}>A</div>

                    </div>
                    <div className={gStyle.ph}>
                        <div className={gStyle.pj}>A</div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Group;
