import React from "react";

const ListSearch = ({ searchValue, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 text-lg shadow-lg bg-secondary shadow placeholder-white placeholder-opacity-75 text-white font-semibold rounded-2xl focus:bg-hoverbg"
        placeholder="Wpisz kod salonu"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ListSearch;