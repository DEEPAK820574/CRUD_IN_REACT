// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UserDetailPage from './Pages/UserDetailPage';
import UserForm from './Components/UserForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserForm isEdit={true} />} />
        <Route path="/create" element={<UserForm isEdit={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
