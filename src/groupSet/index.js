import React from 'react';
import groupSetStyle from './style';
import { HiUserCircle } from "react-icons/hi";


const GroupSetStyle = () =>{
    const gsStyle = groupSetStyle();

    return(
        <div>
            <div className={gsStyle.head}>
                <span className={gsStyle.wb1}>WhiteBoard</span>
                <span className={gsStyle.wbIcon}><HiUserCircle/></span>
                <span className={gsStyle.wb2}>내프로젝트</span>
            </div>

            <div className={gsStyle.sMain}>
                <div className={gsStyle.sList}>
                    <span className={gsStyle.sP}>Project 1</span>
                    <ul>
                        <li>프로젝트 정보</li>
                        <li>팀원 관리</li>
                        <li>팀원 초대</li>
                        <li>설정</li>

                    </ul>
                </div>
                <div className={gsStyle.sImform}>
                    <div>프로젝트 정보</div>
                    <div>
                        <span className={gsStyle.as}>a</span>
                        <span >프로젝트 이미지</span>

                    </div>

                </div>
            </div>
        </div>
    )

}

export default GroupSetStyle;
