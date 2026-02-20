import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Bro AI</h1>
      <p className="mb-4">Your intelligent AI assistant for chat, file processing, and more.</p>
      <motion.button
        className="bg-blue-500 text-white p-2 rounded"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default Home;