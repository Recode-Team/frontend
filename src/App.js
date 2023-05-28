import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './pages/Main';
import Group from './pages/Group';
import BoardList from './pages/BoardList';
import Board from './pages/board/Board';
import MinutesList from './pages/minutes/MinutesList';
import MinutesDetails from './pages/minutes/MinutesDetails';
import CollaborationComponent from './pages/minutes/CollaborativeEditor';

const rootElement = document.getElementById("root");
render(<Board />, rootElement);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/group" element={<Group />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/board" element={<Board />} />

          <Route path="/meeting" element={<MinutesList />} />
          <Route path="/meeting/:id" element={<MinutesDetails />} />
          <Route path="/meeting/:id/edit" element={<CollaborationComponent />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;