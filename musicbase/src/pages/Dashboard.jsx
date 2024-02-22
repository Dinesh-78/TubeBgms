import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [latestMusic, setLatestMusic] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
 
    axios.get('http://localhost:5000/bgms')
      .then(response => {
        setLatestMusic(response.data);
      })
      .catch(error => {
        console.error('Error fetching latest music data:', error);
      });
  }, []);

  const AudioPlayer = ({ filename }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
      if (currentlyPlaying !== filename && currentlyPlaying !== null) {
        const audio = document.getElementById(currentlyPlaying);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
      setIsPlaying(prevState => !prevState);
      setCurrentlyPlaying(filename);
    };

    return (
      <li key={filename}>
        <audio
          id={filename}
          src={require(`./${filename}`)} 
          controls
          autoPlay={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button><br />
        {filename}
      </li>
    );
  };

  return (
    <div>
      <h2>Latest Music</h2>
      <div className="latestmusic">
        <ul>
          {latestMusic.map((item, index) => (
             <>
              <h1>{item.songname}</h1>
            <AudioPlayer key={index} filename={item.filename} />
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
