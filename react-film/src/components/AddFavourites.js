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
  const handleClick = (event) => {
    handleFavourite();
    event.stopPropagation();
    // Code pour ajouter aux favoris...
  };
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

  const getNoteColor = (note) => {
    if (note >= 7) {
      return 'green';
    } else if (note >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const getFormattedDate = (dateString) => {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const date = new Date(dateString);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div>
      <div className="movie-details">
        {movie.release_date && <h3 className='date'>{getFormattedDate(movie.release_date)}</h3>}
        <h2 className="title">{selectedType === "movie" ? movie.title : movie.name}</h2>
        <p className="description">{movie.overview}</p>

      {movie.vote_count > 20 && (
      <div className='note-circle' style={{backgroundColor: getNoteColor(movie.vote_average)}}>
        {movie.vote_average.toFixed(1)}
      </div>
    )}
    
      </div>
      <div className="add-favourites" onClick={handleClick}>
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
