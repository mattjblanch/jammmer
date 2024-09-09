import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [term, setTerm] = React.useState(''); 

    const passTerm = () => {
        onSearch(term);
    };
    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };
    const search = () => {
      onSearch(term);
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        search();
      }
    };

    return (
    <div className={styles.SearchBar}>
      <input 
        placeholder="Enter A Song, Album, or Artist" 
        value={term}
        onChange={handleTermChange}
        onKeyPress={handleKeyPress}
        className={styles.SearchBarInput}
      />
      <button className={styles.SearchButton} onClick={passTerm}>SEARCH</button>
    </div>
  );
}

export default SearchBar; 