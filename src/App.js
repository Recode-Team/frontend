import React from 'react';
import Main from './pages/Main';
import Layout from "./layouts/Layout";
import Group from "./pages/CreateGroup"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (
    // <Layout>
    //   <Main />
    //   {/* <Route path="/group" element={<Group />} /> */}
    // </Layout>
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
