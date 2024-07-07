"use client";

import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="flex items-center w-full max-w-md border border-gray-300 rounded-full bg-white px-4">
      <input
        type="text"
        placeholder="Buscar anuncios, ofertas, promociones..."
        className="flex-grow p-2 rounded-full outline-none"
      />
      <FaSearch className="text-gray-600" />
    </div>
  );
};

export default SearchBar;
