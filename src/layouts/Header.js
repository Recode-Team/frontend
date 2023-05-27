import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import SignUp from '../modals/SignUp';
import Login from '../modals/Login';
import "./styles.css";
import logoimg from './whale.png';

const Header = () => {
  const [signUpOn, setSignUpOn] = useState(false);
  const [loginOn, setLoginOn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const goToGroup = () => {
    navigate('/group');
  }
  const handleLogout = () => {
    setIsLogin(false);
    navigate('/');
  }

  return (
    <>
    <SignUp show={signUpOn} onHide={() => setSignUpOn(false)} />
    <Login show={loginOn} onHide={() => setLoginOn(false)} setIsLogin={setIsLogin}/>
    
    <div className="header">
            <div className="head-title">              
              <div className="title-container">
                  <a href="/"><p className="logo-txt">Flow Meet</p></a>
              </div>
              <div><img src={logoimg} alt="logo" className="logo-img"></img></div>
            </div>
            {isLogin ? ( // 로그인 상태에 따라 분기 처리
                <div className="navbar">
                    <button type="button" className="nav-button" onClick={() => goToGroup(true)}>Project</button>
                    <button type="button" className="nav-button" onClick={() => handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="navbar">
                    <button type="button" className="nav-button" onClick={() => setLoginOn(true)}>Login</button>
                    <button type="button" className="nav-button" onClick={() => setSignUpOn(true)}>Signup</button>
            </div>
            )}
        </div>
    </>
  )
};

export default Header