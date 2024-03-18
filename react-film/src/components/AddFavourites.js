import React from 'react';

const AddFavourites = ({ movie, selectedType }) => {
  return (
    <div className="movie-details">
      {movie && (
        <div className="details">
          <h2 className="title">{selectedType === "movie" ? movie.title : movie.name}</h2>
          <p className="description">{movie.overview}</p>
        </div>
      )}
      <div className="add-favourites">
        <span>Ajouter aux favoris</span>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 16 16'
          className='bi bi-heart-fill'
          fill='red'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
          />
        </svg>
      </div>
    </div>
  );
};

export default AddFavourites;
