import { useRef, useEffect, useState } from 'react';
import { IoIosPlay, IoIosPause, IoMdVolumeHigh, IoMdVolumeOff, IoIosSkipForward, IoIosSkipBackward, IoIosMore } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';

function Player({ song, onPrev, onNext }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [accentColor, setAccentColor] = useState('#090602'); 

  useEffect(() => {
    if (song) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(song.url);
      audioRef.current = audio;

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
        setIsLoading(false);
      });

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audio.addEventListener('play', () => {
        setIsPlaying(true);
        setAccentColor(song.accent)
      });

      audio.addEventListener('pause', () => {
        setIsPlaying(false);
      });

      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      setIsPlaying(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [song]);

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!song) return null;

  const coverImage = `https://cms.samespace.com/assets/${song.cover}`;
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="md:w-2/5 w-full order-1 md:order-3 flex flex-col justify-center items-start p-4 bg-gradient-to-r from-blacked" style={{ backgroundColor: accentColor }}>

      {/* Header with the music name and the artist */}
      <div className='pb-6'>
        <h1 className='font-inter text-3xl font-semibold text-slate-100 pb-1'>{song.name}</h1>
        <h3 className='font-inter text-sm font-semibold text-slate-100 opacity-50'>{song.artist}</h3>
      </div>

      {/* Image along with the progress bar */}
      <div className='flex flex-col'>
        <img src={coverImage} 
             alt='cover-image' 
             className="w-96 h-96 rounded-lg object-cover mb-5" />
        <div
          ref={progressRef}
          className="w-full h-2 bg-gray-300 rounded cursor-pointer mb-2"
          onClick={handleProgressClick}
        >
        <div
            className="h-full bg-slate-500 rounded"
            style={{ width: `${progressPercentage}%` }}
        />
        </div>

        {/* Audio Play buttons */} 
        <div className="flex justify-between items-center my-4">
          <button className="text-white text-xl mx-4 p-2 bg-button-color rounded-full opacity-90">
            <IoIosMore />
          </button>
          <div className='flex justify-center items-center'>
            <button onClick={onPrev} 
                    className="text-white text-xl ">
            <IoIosSkipBackward />
          </button>
          {isLoading ? (
            <FaSpinner className="animate-spin text-white text-3xl" />
          ) : (
            <button onClick={togglePlayPause} 
                    className="text-slate-900 text-2xl mx-4 bg-slate-100 p-3 rounded-full">
                      {audioRef.current && audioRef.current.paused ? <IoIosPlay /> : <IoIosPause />}
            </button>
          )}
          <button onClick={onNext} 
                  className="text-white text-xl ">
            <IoIosSkipForward />
          </button>
          </div>
          <button onClick={toggleMute} 
                  className="text-white text-xl mx-4 p-2 bg-button-color opacity-90 rounded-full">
                      {isMuted ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
