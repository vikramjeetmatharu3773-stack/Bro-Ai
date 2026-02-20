import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { scaleIn } from '../animations/animations';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', 'user1'); // From auth
    await axios.post('http://localhost:5000/api/files/upload', formData);
    alert('File uploaded');
  };

  return (
    <motion.div
      className="p-4"
      {...scaleIn}
    >
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload} className="bg-green-500 text-white p-2 mt-2">Upload</button>
    </motion.div>
  );
};

export default FileUploader;