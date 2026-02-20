import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import { fadeIn } from '../animations/animations';

const socket = io('http://localhost:5000');

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { text: input, userId: 'user1' });
    setMessages(prev => [...prev, { text: input, from: 'user' }]);
    setInput('');
  };

  return (
    <motion.div
      className="chat-container p-4"
      {...fadeIn}
    >
      <div className="messages border p-2 h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === 'user' ? 'text-right' : 'text-left'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        className="border p-2 w-full"
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 mt-2">Send</button>
    </motion.div>
  );
};

export default ChatBox;