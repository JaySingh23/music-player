import './App.css'
import Navbar from './components/Navbar';
import List from './components/List';
import Player from './components/Player';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
   const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        setSongs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, []);

  const currentSong = songs[currentSongIndex];

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1));
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex < songs.length - 1 ? prevIndex + 1 : 0));
  };
  return (
    <>
      <div className="flex md:flex-row flex-col md:h-screen bg-blacked">
        <Navbar />
        <List setCurrentSongIndex={setCurrentSongIndex} />
        <Player song={currentSong} onPrev={handlePrev} onNext={handleNext} />
      </div>
    </>
  )
}

export default App
