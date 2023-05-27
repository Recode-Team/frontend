// import React, {useEffect, useRef, useState} from "react";
import React, {useRef, useState} from "react";
import styles from "sidebar.module.css"
import micIcon from "micIcon.png"

const Sidebar = ({ width=90, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();
  
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div ref={side}  className={styles.sidebar} style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
          <button onClick={() => toggleMenu()}
          className={styles.button} >
            {isOpen ? 
            <img src = {micIcon} alt="X" className={styles.openBtn}/> : <img src={micIcon} alt="O" className={styles.openBtn}/>
            }
          </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
