
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupMessageView from './GroupMessageView.jsx';
import PrivateMessageView from './PrivateMessageView.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Settings from './SettingsModal.jsx'
function App() {
  return (
    <div className = "container">
    <Routes>
      <Route path="/groupmessage" element={<GroupMessageView />} />
      <Route path="/privatemessage" element={<PrivateMessageView />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path = "/settings" element = {<Settings />}/>
    </Routes>
  </div>);
}

export default App;