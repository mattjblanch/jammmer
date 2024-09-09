import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify/Spotify';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
    // Method to add a track to the playlist
  const addTrack = (track) => {
    // Check if the track is already in the playlist
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // Add the track to the playlist
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    // Filter the track from the playlist
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };
  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  };
  const search = (term) => {
    Spotify.search(term).then(results => {
      setSearchResults(results);
    });
  };
  return (
    <div>
      <div className='App'>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className='AppContainer'>
          <SearchBar onSearch={search}/>
          <div className='AppPlaylistContainer'>
            <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks} 
              onRemove={removeTrack} 
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;