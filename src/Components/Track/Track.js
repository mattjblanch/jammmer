import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  // Method to pass the track to the onAdd method
  const passTrack = () => {
    if (isRemoval) {
      onRemove(track);
    } else {
      onAdd(track);
    }
  };

  const passTrackToRemove = () => {
    onRemove(track);
  }
  const renderAction = () => {
    if (isRemoval) {
      return <button className={styles.TrackAction} onClick={passTrackToRemove}>-</button>;
    } else {
      return <button className={styles.TrackAction} onClick={passTrack}>+</button>;
    }
  };

  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3 className={styles.TrackInformation}>{track.name}</h3>
        <p className={styles.TrackInformation}>{track.artist} | {track.album}</p>
      </div>
      {renderAction()}
    </div>
  );
}

export default Track;