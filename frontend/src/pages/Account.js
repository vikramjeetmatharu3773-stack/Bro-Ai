import React, { useState } from 'react';
import axios from 'axios';

const Account = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const register = async () => {
    await axios.post('/api/auth/register', form);
    alert('Registered');
  };

  const login = async () => {
    const res = await axios.post('/api/auth/login', { email: form.email, password: form.password });
    localStorage.setItem('token', res.data.token);
    alert('Logged in');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({...form, password: e.target.value})} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Account;