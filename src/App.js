import React, { useState } from 'react';
import Header from './Header';
import { Container } from 'react-bootstrap';

function App() {
  const [minutes, setMinutes] = useState({ transcription: '', summary: '' });

  const handleFileChange = async (event) => {
    const file = event.target.files && event.target.files[0]; // 파일 선택 여부를 먼저 확인
    if (!file) {
      console.log('파일이 선택되지 않았습니다.');
      return;
    }
    const formData = new FormData();
    formData.append('audioFile', file);
    formData.append('encoding', 'MP3');
  
    const response = await fetch('http://localhost:5000/create-minutes', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣\s]+/g;
    const transcription = data.transcription.match(regex).join('');
    const summary = data.summary.match(regex).join('');

    setMinutes({ transcription, summary });

  
    // setMinutes(data);
  };
  

  return (
    <div>
      <Header />
      <Container style={{minHeight:"75vh", marginTop:"50px" }}>
      <form onSubmit={handleFileChange}>
        <b>회의 녹음 파일: </b>
        <input type="file" name="audioFile" accept="audio/*" onChange={handleFileChange} />
        {/* <button type="submit" >Submit</button> */}
        <div className="minutes" style={{marginTop:"30px", border: "1px solid black", borderRadius: "10px"}}>
          <div style={{marginLeft:"30px", marginTop:"30px"}}><h4>회의 내용</h4></div>
          <div style={{margin:"30px"}}>{minutes.transcription}</div>
          <div style={{marginLeft:"30px", marginTop:"30px"}}><h4>회의 요약</h4></div>
          <div style={{margin:"30px"}}>{minutes.summary}</div>
        </div>
      </form>
      </Container>
    </div>

  );
}

export default App;