import React from 'react';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './pages/Main';
import Group from "./pages/CreateGroup"
import Board from './pages/board/Board';

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
          <Route path="/board" element={<Board />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;