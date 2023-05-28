import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUp from '../modals/SignUp';
import Login from '../modals/Login';
import './header.css';
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
  };

  const goToMinutes = () => {
    navigate('/minutes');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLogin(false);
    navigate('/');
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setIsLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <>
      <SignUp show={signUpOn} onHide={() => setSignUpOn(false)} />
      <Login show={loginOn} onHide={() => setLoginOn(false)} setIsLogin={handleLogin} />
      {isLogin ? (
        <div className="header" style={{ position: isMainPage ? 'fixed' : 'sticky' }}>
          <div className="head-title">
            <div className="title-container">
              <a href="/">
                <p className="logo-txt">Flow Meet</p>
              </a>
            </div>
            <div>
              <img src={logoimg} alt="logo" className="logo-img"></img>
            </div>
          </div>
          <div className="navbar">
            {location.pathname !== '/' && location.pathname !== '/group' && (
              <button type="button" className="nav-button-right" onClick={() => goToMinutes(true)}>
                Minutes
              </button>
            )}
            <button type="button" className="nav-button-right" onClick={() => goToGroup(true)}>
              Group
            </button>
            <button type="button" className="nav-button-right" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="header" style={{ position: isMainPage ? 'fixed' : 'sticky' }}>
          <div className="head-title">
            <div className="title-container">
              <a href="/">
                <p className="logo-txt">Flow Meet</p>
              </a>
            </div>
            <div>
              <img src={logoimg} alt="logo" className="logo-img"></img>
            </div>
            <button
              type="button"
              className="nav-button-left"
              onClick={() => window.open('https://github.com/Recode-Team')}
            >
              Github
            </button>
            <button
              type="button"
              className="nav-button-left"
              onClick={() => window.open('https://github.com/orgs/Recode-Team/people')}
            >
              License
            </button>
          </div>
          <div className="navbar">
            <button type="button" className="nav-button-right" onClick={() => setLoginOn(true)}>
              Login
            </button>
            <button type="button" className="nav-button-right" onClick={() => setSignUpOn(true)}>
              Signup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
