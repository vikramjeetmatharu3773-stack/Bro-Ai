import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { scaleIn } from '../animations/animations';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [files, setFiles] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [usersRes, logsRes, filesRes, analyticsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/users', config),
        axios.get('http://localhost:5000/api/admin/logs', config),
        axios.get('http://localhost:5000/api/admin/files', config),
        axios.get('http://localhost:5000/api/admin/analytics', config)
      ]);
      setUsers(usersRes.data);
      setLogs(logsRes.data);
      setFiles(filesRes.data);
      setAnalytics(analyticsRes.data);
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className="container mx-auto p-4"
      {...scaleIn}
    >
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded">Users: {analytics.userCount}</div>
        <div className="bg-green-100 p-4 rounded">Logs: {analytics.logCount}</div>
        <div className="bg-yellow-100 p-4 rounded">Files: {analytics.fileCount}</div>
      </div>
      <h2>Users</h2>
      <ul className="mb-4">
        {users.map(user => <li key={user._id}>{user.name} - {user.email}</li>)}
      </ul>
      <h2>Recent Logs</h2>
      <ul>
        {logs.slice(0, 10).map(log => <li key={log._id}>{log.action} by {log.userId?.name} at {new Date(log.timestamp).toLocaleString()}</li>)}
      </ul>
    </motion.div>
  );
};

export default Admin;