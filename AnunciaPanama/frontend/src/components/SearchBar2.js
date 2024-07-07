"use client";

import { FaSearch } from 'react-icons/fa';
import styles from '../styles/SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Buscar anuncios, ofertas, promociones..."
        className={styles.searchInput}
      />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
};

export default SearchBar;
