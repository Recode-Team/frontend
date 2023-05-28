import React, { useState } from 'react';
import CreateGroup from '../modals/CreateBoard';
import pencil from './icon/pencil.png';
import './style.css';

const Group = () => {
    const [CreateOn, setCreateOn] = useState(false);
    const [groups, setGroups] = useState([]);

    return(
        <>
            <CreateGroup show={CreateOn} onHide={() => setCreateOn(false)} setGroups={setGroups} />
            <div className="responsive-wrapper">
                <div className="group-header">
                    <h1 className="group-header-txt">Board List</h1>
                    <button className="create-btn" onClick={() => setCreateOn(true)}>Create</button>
                </div>
                <div className="content-main">
                    <div className="card-grid">
                        {groups.map((group, index) => (
                            <article className="card">
                            <div className="card-header">
                                <div className="card-header-1">
                                    <span className="card-header-2"><img className="card-header-3" alt="" src={pencil} /></span>
                                    <p className="card-header-4">{group.name}</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-body-txt">{group.info}</p>
                            </div>
                            <div className="card-footer">
                                <a href="/board">View Board</a>
                            </div>
                        </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Group;