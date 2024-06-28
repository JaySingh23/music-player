import { useEffect, useState } from 'react';
import Search from '../utility/Search';
import axios from 'axios';
import Song from '../utility/Song'
import Loader from '../utility/Loader'
// eslint-disable-next-line react/prop-types
function List({setCurrentSongIndex}) {
  const [activeTab, setActiveTab] = useState('ForYou');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [searchTerm, setSearchTerm] = useState('');

  //function to fetch the songs
  useEffect(() => {
    async function fetchSongs() {
        try {
            const response = await axios.get('https://cms.samespace.com/items/songs');
            setSongs(response.data.data);
            setLoading(false);
        }
        catch(error) {
            console.log(error);
            setLoading(false);
        }
    }

    fetchSongs();
  }, [])
  // Function to handle tab switching
  const openTab = (tabName) => {
    setActiveTab(tabName);
  };
  //handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }
  
  // Filter songs based on the search term
  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:w-2/5 w-full order-3 md:order-2 h-full p-2 pt-4 flex flex-col bg-blacked ">
      {/* Tabs Button */}
      <div className="flex">
        <button
          className={`px-4 py-2 text-lg font-inter font-semibold tracking-wide text-gray-100 bg-transparent transition-opacity duration-300 transform hover:opacity-100 ${activeTab === 'ForYou' ? 'opacity-100' : 'opacity-75'}`}
          onClick={() => openTab('ForYou')}
        >
          For You
        </button>
        <button
          className={`px-4 py-2 text-lg font-inter font-semibold tracking-wide text-gray-100 bg-transparent transition-opacity duration-300 transform hover:opacity-100 ${activeTab === 'TopTracks' ? 'opacity-100' : 'opacity-75'}`}
          onClick={() => openTab('TopTracks')}
        >
          Top Tracks
        </button>
      </div>

      {/* Search Bar */}
      <Search searchTerm = {searchTerm} onSearchChange = {handleSearchChange} />

      {/* Tab Contents */}
      <div id="ForYou" className={`w-4/5 pl-3 ${activeTab === 'ForYou' ? '' : 'hidden'}`}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredSongs.length === 0 ? (
              <p className="text-slate-100">No results found</p>
            ) : (
              <ul>
                {filteredSongs.map((song, index) => (
                  <Song key={song.id} song = {song} onSelect = {() => setCurrentSongIndex(index)} />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <div id="TopTracks" className={`w-4/5 pl-3 ${activeTab === 'TopTracks' ? '' : 'hidden'}`}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredSongs.length === 0 ? (
              <p className="text-slate-100">No results found</p>
            ) : (
              <ul>
                {filteredSongs.slice(0,7).map((song, index) => (
                  <Song key={song.id} song = {song} onSelect = {() => setCurrentSongIndex(index)} />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default List;
