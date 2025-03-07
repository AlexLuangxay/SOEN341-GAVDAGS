
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupMessageView from './GroupMessageView.jsx';
import PrivateMessageView from './PrivateMessageView.jsx';
import LoginPage from './Login.jsx';

function App() {
  return (
    <div class = "container">
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/privatemessage" element={<PrivateMessageView />} />
    </Routes>
<<<<<<< HEAD
  </div>)
}
=======
  </div>);
}

>>>>>>> main
export default App;