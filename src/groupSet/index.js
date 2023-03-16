import React from 'react';
import groupSetStyle from './style';
import { HiUserCircle } from "react-icons/hi";


const GroupSetStyle = () =>{
    const gsStyle = groupSetStyle();

    return(
        <div className={gsStyle.gsMain}>
            <div className={gsStyle.head}>
                <span className={gsStyle.wb1}>WhiteBoard</span>
                <span className={gsStyle.wbIcon}><HiUserCircle/></span>
                <span className={gsStyle.wb2}>내프로젝트</span>
            </div>
            
            <div className={gsStyle.divLR}>
                <div className={gsStyle.divL}>
                    <h1>Project 1</h1>
                    <ul className = {gsStyle.ul}>
                        <li className = {gsStyle.li}>프로젝트 정보</li>
                        <li className = {gsStyle.li}>팀원 관리</li>
                        <li className = {gsStyle.li}>팀원 초대</li>
                        <li className = {gsStyle.li}>설정</li>
                    </ul>
                </div>

                <div className={gsStyle.divR}>
                    <div className={gsStyle.menuName}>
                        <h2 className={gsStyle.hTow}>프로젝트 정보</h2>
                    </div>
                    <div>
                        <img src = "./image.jpg" alt='not found'/>
                        <div>프로젝트 이미지</div>
                        {/* <input type='button'>이미지 변경</input> */}
                    </div>
                </div>
            </div>

        </div>
    )

}

export default GroupSetStyle;
