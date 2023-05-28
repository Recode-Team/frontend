import React from 'react'
import girl from './icon/girl.png';
import "./style.css";

function Main() {
  return (
    <div className="body-container">
      <section className="first-section">
        <div className="main-title">
          <h1 className="title-line">시작부터 끝까지</h1>
          <h1 className="title-line">Flow Meet과 함께</h1>
        </div>
        <button className="start-btn">시작하기</button>
        <div className="fly">
          <img src={girl} className="girl" alt=""></img>
        </div>
        <div className="wave-box">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
      </section>
      <section className="second-section">
        <div className="second-bg"></div>
      </section>
    </div>    
  )
}

export default Main