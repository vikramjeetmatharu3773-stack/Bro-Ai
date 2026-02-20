import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', 'user1'); // From auth
    await axios.post('/api/files/upload', formData);
    alert('File uploaded');
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default FileUploader;