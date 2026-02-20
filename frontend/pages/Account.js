import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { slideIn } from '../animations/animations';

const Account = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const register = async () => {
    await axios.post('http://localhost:5000/api/auth/register', form);
    alert('Registered');
  };

  const login = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email: form.email, password: form.password });
    localStorage.setItem('token', res.data.token);
    alert('Logged in');
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      {...slideIn}
    >
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} className="border p-2 block mb-2" />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} className="border p-2 block mb-2" />
      <input placeholder="Password" type="password" onChange={(e) => setForm({...form, password: e.target.value})} className="border p-2 block mb-2" />
      <button onClick={register} className="bg-blue-500 text-white p-2 mr-2">Register</button>
      <button onClick={login} className="bg-green-500 text-white p-2">Login</button>
    </motion.div>
  );
};

export default Account;