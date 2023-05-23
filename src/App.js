import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './pages/Main';
import Group from "./pages/CreateGroup"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/group" element={<Group />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;