import React, { useRef, useState } from 'react';
import './style.css';

const Recording = () => {
  const previewPlayerRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;
  const [minutes, setMinutes] = useState({ transcription: '', summary: '' });

  const videoStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      previewPlayerRef.current.srcObject = stream;
      startRecording(stream);
    } catch (error) {
      console.error('미디어 스트림을 가져올 수 없습니다:', error);
    }
  };

  const startRecording = (stream) => {
    setRecording(true);
    recordedChunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.addEventListener('stop', handleStop);
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  };

  const handleStop = async () => {
    const blob = new Blob(recordedChunksRef.current, { type: 'audio/mp3' });
    const formData = new FormData();
    formData.append('audioFile', blob);
    formData.append('encoding', 'MP3');

    try {
      const response = await fetch(`${ipAddress}/api/minutes/create`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣\s]+/g;

        if (data.result && data.result.transcription && data.result.summary && data.result.title) {
          const transcription = data.result.transcription.match(regex).join('');
          const summary = data.result.summary.match(regex).join('');
          const title = data.result.title.match(regex).join('');
          setMinutes({ transcription, summary, title });
        } else {
          console.error('서버에서 전달된 오디오 데이터가 올바르지 않습니다.');
        }
      } else {
        console.error('오디오 파일 업로드 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('오디오 파일 업로드 중 오류가 발생했습니다:', error);
    }
  };

  const stopRecording = () => {
    previewPlayerRef.current.srcObject.getTracks().forEach((track) => track.stop());
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // const handleDownloadClick = () => {
  //   if (recording) {
  //     alert('녹화를 먼저 중지해주세요.');
  //   } else {
  //     handleStop();
  //   }
  // };

  return (
    <>
      <div className="button">
        {recording ? (
          <button className="stop-button" onClick={stopRecording}>
            녹음 종료
          </button>
        ) : (
          <button className="record-button" onClick={videoStart}>
            녹음 시작
          </button>
        )}
      </div>
      <div className="video-container">
        <video className="preview-video" autoPlay muted ref={previewPlayerRef}></video>
      </div>
    </>
  );
};

export default Recording;

// import React, { useRef, useState } from 'react';
// import "./style.css"

// const Recording = () => {
//   const previewPlayerRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);
//   const ipAddress = process.env.REACT_APP_IP_ADDRESS;

//   const videoStart = () => {
//     // 사용자 미디어(오디오 및 비디오) 스트림 획득
//     navigator.mediaDevices.getUserMedia({ audio: true }) // 오디오
//     // navigator.mediaDevices.getUserMedia({ audio: true, video: true }) // 오디오 + 영상
//       .then(stream => {
//         // 미리보기 비디오 플레이어에 스트림 설정
//         previewPlayerRef.current.srcObject = stream;
//         // 녹화 시작
//         startRecording(stream);
//       });
//   };

//   const startRecording = (stream) => {
//     setRecording(true); // 녹화 상태로 설정
//     recordedChunksRef.current = []; // 기존에 기록된 청크 초기화
//     mediaRecorderRef.current = new MediaRecorder(stream); // 미디어 레코더 생성 및 설정

//     // 데이터 이용 가능 이벤트 핸들러 등록
//     mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
//     mediaRecorderRef.current.addEventListener('stop', handleStop); // 정지 이벤트 핸들러

//     mediaRecorderRef.current.start(); // 녹화 시작
//   };

//   const handleDataAvailable = (event) => {
//     if (event.data.size > 0) {
//       // 기록된 청크 데이터 추가
//       recordedChunksRef.current.push(event.data);
//     }
//   };

//   const handleStop = async () => {
//     // 녹화 중지 후 파일 다운로드
//     const blob = new Blob(recordedChunksRef.current, { type: 'video/mp3' }); // 오디오
//     // const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' }); // 오디오 + 영상

//     const [minutes, setMinutes] = useState({ transcription: '', summary: '' });

//     const url = URL.createObjectURL(blob); // 녹음 데이터 URL로 저장
//     const a = document.createElement('a'); // a태그 기능 저장
//     a.style.display = 'none';
//     a.href = url;
//     a.download = `recording_${new Date()}.mp3`; // 오디오
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);

//     // formData에 url 추가
//     const formData = new FormData();
//     const file = new File([blob], a.download, { type: 'audio/mp3' }); // 파일 객체 생성
//     formData.append('audioFile', file);

//     // 나머지 코드 실행
//     formData.append('encoding', 'MP3');

//     const response = await fetch(`${ipAddress}/api/gpt/minutes/create`, {
//       method: 'POST',
//       body: formData,
//     });
//     const data = await response.json();
//     const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣\s]+/g;
//     const transcription = data.transcription.match(regex).join('');
//     const summary = data.summary.match(regex).join('');

//     setMinutes({ transcription, summary });
//   };

//   // const handleStop = () => {
//   //   // 녹화 중지 후 파일 다운로드
//   //   const blob = new Blob(recordedChunksRef.current, { type: 'video/mp3' }); // 오디오
//   //   // const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' }); // 오디오 + 영상

//   //   const url = URL.createObjectURL(blob); // 녹음 데이터 URL로 저장
//   //   const a = document.createElement('a'); // a태그 기능 저장
//   //   a.style.display = 'none';
//   //   a.href = url;

//   //   a.download = `recording_${new Date()}.mp3`; // 오디오

//   //   // a.download = `recording_${new Date()}.mp4`; // 오디오 + 영상
//   //   document.body.appendChild(a);
//   //   a.click();
//   //   document.body.removeChild(a);
//   //   URL.revokeObjectURL(url);
//   // };

//   // const formData = new FormData();
//   //   formData.append('audioFile', file);
//   //   formData.append('encoding', 'MP3');

//   //   const response = await fetch('http://localhost:5000/create-minutes', {
//   //     method: 'POST',
//   //     body: formData,
//   //   });
//   //   const data = await response.json();
//   //   const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣\s]+/g;
//   //   const transcription = data.transcription.match(regex).join('');
//   //   const summary = data.summary.match(regex).join('');

//   //   setMinutes({ transcription, summary });

//   const stopRecording = () => {
//     // 미리보기 비디오 플레이어의 트랙 중지
//     previewPlayerRef.current.srcObject.getTracks().forEach(track => track.stop());
//     // 미디어 레코더 중지
//     mediaRecorderRef.current.stop();
//     // 녹화 상태 해제
//     setRecording(false);
//   };

//   const handleDownloadClick = () => {
//     if (recording) {
//       // 아직 녹화 중인데 다운로드를 시도 할 경우
//       alert('녹화를 먼저 중지해주세요.');
//     } else {
//       // 녹화 완료 후 다운로드를 시도 할 경우
//       handleStop();
//     }
//   };

//   return (
//     <>
//       <div className='button'>
//         {recording ? (
//           <button className="stop-button" onClick={stopRecording}>STOP RECORDING </button>
//         ) : (
//           <button className="record-button" onClick={videoStart}>RECORDING START</button>
//         )}
//       </div>
//         {/* <button className="download-button" onClick={handleDownloadClick}>다운로드</button> */}
//       <div className="video-container">
//         {/* <h2>녹화 화면</h2>  비디오 녹화 시 녹화 화면 송출용 */}
//         <video className="preview-video" autoPlay muted ref={previewPlayerRef}></video>
//       </div>
//     </>
//   );
// }

// export default Recording;
