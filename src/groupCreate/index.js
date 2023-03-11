import React from 'react';
import groupStyle from './style';

const Group = () => {
    const gStyle = groupStyle();

    return(
        <div>
            <div className={gStyle.head}>
                WhiteBoard
            </div>
            <div>
                <h1 className={gStyle.myPJ}>내 프로젝트</h1>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

        </div>
    )
}

export default Group;
