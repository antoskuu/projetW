import React, { useState, useEffect } from 'react';

const plusEnFavoris = (movie, fav, favDetails, setFavDetails) => {
  let newFav = [...fav];
  let newFavDetails = [...favDetails];

  if (fav.includes(movie.id)) {
    newFav = newFav.filter(favMovie => favMovie !== movie.id);
    newFavDetails = newFavDetails.filter(favMovie => favMovie.id !== movie.id);
  } else {
    newFav.push(movie.id);
    newFavDetails.push(movie);
  }

  setFavDetails(newFavDetails);
  localStorage.setItem('fav_details', JSON.stringify(newFavDetails));
  localStorage.setItem('favourites', JSON.stringify(newFav));

  return newFav;
};

const AddFavourites = ({ movie, selectedType, favDetails, setFavDetails }) => {
  const [fav, setFav] = useState(() => JSON.parse(localStorage.getItem('favourites')) || []);

  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem('favourites')) || []);
  }, []);

  const [isFavourite, setIsFavourite] = useState(fav.includes(movie.id));

  useEffect(() => {
    setIsFavourite(fav.includes(movie.id));
  }, [fav, movie]);

  const handleFavourite = () => {
    const newFav = plusEnFavoris(movie, fav, favDetails, setFavDetails);
    setFav(newFav);
  };

  return (
    <div>
      <div className="movie-details">
        <h2 className="title">{selectedType === "movie" ? movie.title : movie.name}</h2>
        <p className="description">{movie.overview}</p>
      </div>
      <div className="add-favourites" onClick={handleFavourite}>
        {isFavourite ? (
          <svg
            width='2em'
            height='2em'
            viewBox='0 0 24 24'
            className='bi bi-heart-fill'
            fill='red'
            overflow='visible'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
            />
          </svg>
        ) : (
          <svg
            width='2em'
            height='2em'
            viewBox='0 0 24 24'
            className='bi bi-heart'
            fill='none'
            stroke='red'
            overflow='visible'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default AddFavourites;
