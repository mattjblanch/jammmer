import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function SearchResults({ userSearchResults, onAdd }) {
  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <TrackList tracks={userSearchResults} onAdd={onAdd} isRemoval={false} />

    </div>
  );
}

export default SearchResults;