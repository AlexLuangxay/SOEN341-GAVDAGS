import React from "react";
import "./App.css";
import ChatWindow from "../components/ChatWindow";
import Groups from "../components/Groups";
import Channels from "../components/Channels";
import MessageBar from "../components/MessageBar";
import UserSidebar from "../components/UserSidebar";
import TopLeftButtons from "../components/TopLeftButtons";
import TopRightButtons from "../components/TopRightButtons";
import ChatName from "../components/ChatName";

function GroupMessageView() {
  return (
    <div className="App">
      <header className="top-bar">
        <TopLeftButtons />
        <ChatName />
        <TopRightButtons />
      </header>
      <div className="main-container">
        <aside className="left-sidebar">
          <Groups />
          <Channels />
        </aside>
        <main className="chat-container">
          <ChatWindow />
          <MessageBar />
        </main>
        <aside className="right-sidebar">
          <UserSidebar />
        </aside>
      </div>
    </div>
  );
}

export default GroupMessageView;