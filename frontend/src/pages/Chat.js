import React from 'react';
import ChatBox from '../components/ChatBox';
import FileUploader from '../components/FileUploader';

const Chat = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with Bro AI</h1>
      <ChatBox />
      <FileUploader />
    </div>
  );
};

export default Chat;