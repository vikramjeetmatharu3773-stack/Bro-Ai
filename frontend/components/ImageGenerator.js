import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { rotateIn } from '../animations/animations';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);

  const generate = async () => {
    const res = await axios.post('http://localhost:5000/api/ai/generate-image', { prompt });
    setImages(res.data.images);
  };

  return (
    <motion.div
      className="p-4"
      {...rotateIn}
    >
      <h2 className="text-xl font-bold mb-4">Generate AI Images</h2>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for image"
        className="border p-2 w-full mb-4"
      />
      <button onClick={generate} className="bg-purple-500 text-white p-2">Generate</button>
      <div className="mt-4 flex flex-wrap">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt="Generated"
            className="w-32 h-32 mr-2 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ImageGenerator;