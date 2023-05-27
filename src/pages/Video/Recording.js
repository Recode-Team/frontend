import React, { useRef, useState } from 'react';
import "./style.css"

const Recording = () => {
  const previewPlayerRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const videoStart = () => {
    // 사용자 미디어(오디오 및 비디오) 스트림 획득
    navigator.mediaDevices.getUserMedia({ audio: true }) // 오디오
    // navigator.mediaDevices.getUserMedia({ audio: true, video: true }) // 오디오 + 영상
      .then(stream => {
        // 미리보기 비디오 플레이어에 스트림 설정
        previewPlayerRef.current.srcObject = stream;
        // 녹화 시작
        startRecording(stream);
      });
  };

  const startRecording = (stream) => {
    setRecording(true); // 녹화 상태로 설정
    recordedChunksRef.current = []; // 기존에 기록된 청크 초기화
    mediaRecorderRef.current = new MediaRecorder(stream); // 미디어 레코더 생성 및 설정
    
    // 데이터 이용 가능 이벤트 핸들러 등록
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable); 
    mediaRecorderRef.current.addEventListener('stop', handleStop); // 정지 이벤트 핸들러

    mediaRecorderRef.current.start(); // 녹화 시작
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      // 기록된 청크 데이터 추가
      recordedChunksRef.current.push(event.data);
    }
  };

  const handleStop = () => {
    // 녹화 중지 후 파일 다운로드
    const blob = new Blob(recordedChunksRef.current, { type: 'video/mp3' }); // 오디오
    // const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' }); // 오디오 + 영상

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `recording_${new Date()}.mp3`; // 오디오
    // a.download = `recording_${new Date()}.mp4`; // 오디오 + 영상
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stopRecording = () => {
    // 미리보기 비디오 플레이어의 트랙 중지
    previewPlayerRef.current.srcObject.getTracks().forEach(track => track.stop());
    // 미디어 레코더 중지
    mediaRecorderRef.current.stop();
    // 녹화 상태 해제
    setRecording(false);
  };

  const handleDownloadClick = () => {
    if (recording) {
      // 아직 녹화 중인데 다운로드를 시도 할 경우
      alert('녹화를 먼저 중지해주세요.');
    } else {
      // 녹화 완료 후 다운로드를 시도 할 경우
      handleStop();
    }
  };

  return (
    <>
      <div className='button'>
        {recording ? (
          <button className="stop-button" onClick={stopRecording}>STOP RECORDING </button>
        ) : (
          <button className="record-button" onClick={videoStart}>RECORDING START</button>
        )}
      </div>
        {/* <button className="download-button" onClick={handleDownloadClick}>다운로드</button> */}
      <div className="video-container">
        {/* <h2>녹화 화면</h2>  비디오 녹화 시 녹화 화면 송출용 */}
        <video className="preview-video" autoPlay muted ref={previewPlayerRef}></video>
      </div>
    </>
  );
}

export default Recording;


// 정상 코드 할렐루야 - 시작 정지 다운로드

// import React, { useRef } from 'react';

// function Camera() {
//   const previewPlayerRef = useRef(null);
// //   const recordingPlayerRef = useRef(null);
//   let recorder;
//   let recordedChunks;

//   const videoStart = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true}) // 오디오파일만 사용 시
//     // navigator.mediaDevices.getUserMedia({ audio: true, video: true }) // 오디오 + 영상파일 로 사용 시
//       .then(stream => {
//         previewPlayerRef.current.srcObject = stream;
//         startRecording(previewPlayerRef.current.captureStream());
//       });
//   };

//   const startRecording = (stream) => {
//     recordedChunks = [];
//     recorder = new MediaRecorder(stream);
//     recorder.ondataavailable = (e) => {
//       recordedChunks.push(e.data);
//     };
//     recorder.start();
//   };

//   const stopRecording = () => {
//     previewPlayerRef.current.srcObject.getTracks().forEach((track) => track.stop());
//     recorder.stop();
//     console.log(recordedChunks);
//   };

//   const playRecording = () => {
//     const recordedBlob = new Blob(recordedChunks, { type: 'audio/mp3' }); // 오디오파일만 사용 시
//     // const recordedBlob = new Blob(recordedChunks, { type: 'video/mp4' }); // 오디오 + 영상파일 로 사용 시
//     const downloadUrl = URL.createObjectURL(recordedBlob);
//     const A = document.createElement('a');
//     A.style.display = 'none';
//     A.href = downloadUrl;
//     A.download = `recording_${new Date()}.mp3`; // 오디오파일만 사용 시
//     // a.download = `recording_${new Date()}.mp4`; // 오디오 + 영상파일 로 사용 시
//     document.body.appendChild(A);
//     A.click();
//     document.body.removeChild(A);
//     URL.revokeObjectURL(downloadUrl);
//   };

//   return (
//     <div className="wrapper">
//       <div className="button-container">
//         <button className="record-button" onClick={videoStart}>녹화</button>
//         <button className="stop-button" onClick={stopRecording}>정지</button>
//         <button className="play-button" onClick={playRecording}>다운로드</button>
//       </div>

//       {/* 비디오 녹화 시 녹화 화면 송출용*/}
//       <div className="video-container">
//         <div className="video-item">
//           {/* <h2>Preview</h2> */}
//           <video style={{
//             height:10,
//             width:10,
//           }} autoPlay muted ref={previewPlayerRef}></video>
//         </div>
//       </div> 
//     </div>
//   );
// }

// export default Camera;



// ////////////시작(중지) - 다운로드/////////////////

// import React, { useRef, useState } from 'react';

// function Camera() {
//   const previewPlayerRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);

//   const videoStart = () => {
//     // navigator.mediaDevices.getUserMedia({ audio: true}) // 오디오
//     navigator.mediaDevices.getUserMedia({ audio: true, video: true }) // 영상
//       .then(stream => {
//         previewPlayerRef.current.srcObject = stream;
//         startRecording(stream);
//       });
//   };

//   const startRecording = (stream) => {
//     setRecording(true);
//     setRecordedChunks([]);
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.ondataavailable = handleDataAvailable;
//     mediaRecorder.start();
//   };

//   const handleDataAvailable = (event) => {
//     if (event.data.size > 0) {
//       setRecordedChunks(prevChunks => [...prevChunks, event.data]);
//     }
//   };

//   const stopRecording = () => {
//     previewPlayerRef.current.srcObject.getTracks().forEach((track) => track.stop());
//     setRecording(false);
//   };

//   const downloadRecording = () => {
//     // const blob = new Blob(recordedChunks, { type: 'audio/mp3' }); // 오디오
//     const blob = new Blob(recordedChunks, { type: 'video/mp4' }); // 영상
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     // a.download = `recording_${new Date()}.mp3`; // 오디오
//     a.download = `recording_${new Date()}.mp4`; // 영상
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="wrapper">
//       <div className="button-container">
//         {recording ? (
//           <button className="stop-button" onClick={stopRecording}>정지</button>
//         ) : (
//           <button className="record-button" onClick={videoStart}>녹화</button>
//         )}
//         <button className="download-button" onClick={downloadRecording}>다운로드</button>
//       </div>
//       <div className="video-container">
//         <div className="video-item">
//           <h2>Preview</h2>
//           <video autoPlay muted ref={previewPlayerRef}></video>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Camera;
