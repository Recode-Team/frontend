import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import SignUp from '../modals/SignUp';
import Login from '../modals/Login';
import "./header.css";
import logoimg from './whale.png';

const Header = () => {
  const [signUpOn, setSignUpOn] = useState(false);
  const [loginOn, setLoginOn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

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
    
    <div className="header" style={{ position: isMainPage ? 'fixed' : 'sticky' }}>
            <div className="head-title">              
              <div className="title-container">
                  <a href="/"><p className="logo-txt">Flow Meet</p></a>
              </div>
              <div><img src={logoimg} alt="logo" className="logo-img"></img></div>
              <button type="button" className="nav-button-left" onClick={() => window.open('https://github.com/Recode-Team')}>Github</button>
              <button type="button" className="nav-button-left" onClick={() => window.open('https://github.com/orgs/Recode-Team/people')}>License</button> 
              {/* 라이센스 페이지로 바꾸기 */}
            </div>
            {isLogin ? ( // 로그인 상태에 따라 분기 처리
                <div className="navbar">
                    <button type="button" className="nav-button-right" onClick={() => goToGroup(true)}>Group</button>
                    <button type="button" className="nav-button-right" onClick={() => handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="navbar">
                    <button type="button" className="nav-button-right" onClick={() => setLoginOn(true)}>Login</button>
                    <button type="button" className="nav-button-right" onClick={() => setSignUpOn(true)}>Signup</button>
            </div>
            )}
        </div>
    </>
  )
};

export default Header