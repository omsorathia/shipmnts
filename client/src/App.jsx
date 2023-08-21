import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Operations from './Operations.jsx'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Operations />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
