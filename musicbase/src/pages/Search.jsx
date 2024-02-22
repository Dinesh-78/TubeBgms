
import React, { useState } from 'react'

function Search() {
   const [name,setname]=useState("");
   const [songs, setSongs] = useState([]);
   const fetchData=(value) =>{
    fetch("http://localhost:5000/bgms")
    .then((response) => response.json())
     .then((json) =>{
      const res=json.filter((song)=>
        song.songname && song.songname.toLowerCase().includes(value.toLowerCase())
      );
      setSongs(res);
   })
   .catch((err)=>{
    console.log(err);
   });
   }
  const handlechange =(value)=>{
    setname(value)
   fetchData(value)
   }
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
    <div className='Search'>
      <h1>HELLO</h1>
      <input placeholder='Type to search' value={name} onChange={(e)=>handlechange(e.target.value)} />
      <div>
            {songs.map((song) => (
               <div key={song._id}>
                  <p>{song.songname}</p>
                  <p>{song.tags}</p>
                  <AudioPlayer filename={song.filename} />
               </div>))}
               </div>
    </div>
  )
}


export default Search;
