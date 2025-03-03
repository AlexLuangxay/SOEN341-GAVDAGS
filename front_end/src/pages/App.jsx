
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupMessageView from './GroupMessageView.jsx';
import PrivateMessageView from './PrivateMessageView.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function App() {
  return (
    <div class = "container">
    <Routes>
      <Route path="/" element={<GroupMessageView />} />
      <Route path="/privatemessage" element={<PrivateMessageView />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </div>);

export default App;