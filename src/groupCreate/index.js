import React from 'react';
import groupStyle from './style';

const Group = () => {
    const gStyle = groupStyle();

    return(
        <div>
            <div className={gStyle.head}>
                grou
            </div>
            <div>
                group
            </div>
        </div>
    )
}

export default Group;
