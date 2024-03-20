import React from 'react';

const SearchBox = ({ handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event.target.value);
    }
  };

  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        onKeyPress={handleKeyPress}
        placeholder='Rechercher...'
      ></input>
    </div>
  );
};

export default SearchBox;
