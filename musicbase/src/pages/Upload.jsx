import React, { useState } from 'react';
import axios from 'axios';

function UploadMusic() {
  const [musicName, setMusicName] = useState('');
  const [artist, setArtist] = useState('');
  const [musicFile, setMusicFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append('musicName', musicName);
    formData.append('artist', artist);
    formData.append('musicFile', musicFile);

    try {
      // Send POST request to backend endpoint
      await axios.post('/api/upload-music', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error uploading music:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Upload Music</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="musicName">Music Name:</label>
          <input type="text" id="musicName" value={musicName} onChange={(e) => setMusicName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
        </div>
        <div>
          <label htmlFor="musicFile">Music File:</label>
          <input type="file" id="musicFile" onChange={(e) => setMusicFile(e.target.files[0])} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadMusic;
