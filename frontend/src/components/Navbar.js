import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      className="bg-blue-600 p-4 text-white"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Bro AI</Link>
        <div>
          <Link to="/chat" className="mr-4">Chat</Link>
          <Link to="/account" className="mr-4">Account</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;