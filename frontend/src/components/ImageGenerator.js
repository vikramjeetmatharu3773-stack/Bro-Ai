import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);

  const generate = async () => {
    const res = await axios.post('/api/ai/generate-image', { prompt });
    setImages(res.data.images);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Generate AI Images</h2>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for image"
        className="border p-2 w-full mb-4"
      />
      <button onClick={generate} className="bg-blue-500 text-white p-2">Generate</button>
      <div className="mt-4">
        {images.map((img, i) => (
          <img key={i} src={img} alt="Generated" className="w-32 h-32 mr-2" />
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;