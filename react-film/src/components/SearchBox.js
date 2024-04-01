import React from 'react';

const SearchBox = ({ handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event.target.value);
    }
  };

  return (
    <div className='search-bar'>
      <input
      type='text'
        onKeyPress={handleKeyPress}
        placeholder='Rechercher...'
      ></input>
    </div>
  );
};

export default SearchBox;
