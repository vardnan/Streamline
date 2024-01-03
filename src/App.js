import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Base from './components/Base/Base';
import Page from './components/Pages/Page';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/todos" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
