import React from "react";

const ListSearch = ({ searchValue, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 text-lg bg-gray-200 rounded-full shadow"
        placeholder="Wpisz kod salonu"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ListSearch;