import React, {FC} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Base from './components/Base/Base.tsx';
import Page from './components/Pages/Page.tsx';
import './App.css';

const App: FC = () => {
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
