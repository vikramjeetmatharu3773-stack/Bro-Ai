import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
  }, []);

  const sendMessage = async () => {
    if (input.startsWith('/image ')) {
      const prompt = input.slice(7);
      try {
        const res = await axios.post('/api/ai/generate-image', { prompt });
        setMessages(prev => [...prev, { text: `Generated images for: ${prompt}`, from: 'user' }, { images: res.data.images, from: 'ai' }]);
      } catch (error) {
        setMessages(prev => [...prev, { text: 'Error generating image', from: 'ai' }]);
      }
    } else {
      socket.emit('sendMessage', { text: input, userId: 'user1' });
      setMessages(prev => [...prev, { text: input, from: 'user' }]);
    }
    setInput('');
  };

  return (
    <motion.div
      className="chat-container p-4"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="messages border p-2 h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === 'user' ? 'text-right' : 'text-left'}>
            {msg.text && <div>{msg.text}</div>}
            {msg.images && (
              <div className="flex flex-wrap">
                {msg.images.map((img, j) => (
                  <motion.img
                    key={j}
                    src={img}
                    alt="Generated"
                    className="w-32 h-32 mr-2 mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: j * 0.1 }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        className="border p-2 w-full"
        placeholder="Type a message or /image prompt for AI image"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 mt-2">Send</button>
    </motion.div>
  );
};

export default ChatBox;