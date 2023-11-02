import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './pages/Main';
import GroupList from './pages/GroupList';
import BoardList from './pages/BoardList';
import Board from './pages/board/Board';
import MinutesList from './pages/minutes/MinutesList';
import MinutesDetails from './pages/minutes/detail/MinutesDetails';
import CollaborationComponent from './pages/minutes/edit/CollaborativeEditor';

const rootElement = document.getElementById('root');
render(<Board />, rootElement);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/grouplist" element={<GroupList />} />
          <Route path="/boardlist/:id" element={<BoardList />} />
          <Route path="/board/:id" element={<Board />} />

          <Route path="/minutes" element={<MinutesList />} />
          <Route path="/minutes/:id" element={<MinutesDetails />} />
          <Route
            path="/minutes/:id/edit"
            element={<CollaborationComponent />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
