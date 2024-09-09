import React from 'react';
import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';

function Playlist({ playlistName, playlistTracks, onRemove, isRemoval, onNameChange, onSave }) {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };
    return (
    <div className={styles.Playlist}>
      <input 
        defaultValue={playlistName} 
        onChange={handleNameChange}
      />

      <TrackList 
        tracks={playlistTracks} 
        onRemove={onRemove} 
        isRemoval={true} 
      />
      <button className={styles.PlaylistSave} onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;