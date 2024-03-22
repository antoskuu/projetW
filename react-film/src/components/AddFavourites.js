import React, { useState, useEffect } from 'react';




const plusenfavoris = (movie) => {
  
  let fav = JSON.parse(localStorage.getItem('favourites')) || [];
  let fav_details = JSON.parse(localStorage.getItem('fav_details')) || [];
  const movieIndex = fav.findIndex(favMovie => favMovie === movie.id);
  if (fav.includes(movie.id)) {
    fav = fav.filter(favMovie => favMovie !== movie.id);
    fav_details.splice(movieIndex, 1);
    
    
  } else  {
    fav.push(movie.id);
    fav_details.push(movie);
  }
  localStorage.setItem('fav_details', JSON.stringify(fav_details));
  localStorage.setItem('favourites', JSON.stringify(fav));
  console.log(fav);
  console.log(fav_details);

  return fav;
};

const AddFavourites = ({ movie, selectedType }) => {
  const [fav, setFav] = useState([]);
  
  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem('favourites')) || []);
  }, []);

  const handleFavourite = (movie) => {
    
    const newFav = plusenfavoris(movie);
    setFav(newFav);
    window.location.reload();
  
  };

  
  return (
    <div className="movie-details">
      {movie && (
        <div className="details">
          <h2 className="title">{selectedType === "movie" ? movie.title : movie.name}</h2>
          <p className="description">{movie.overview}</p>
        </div>
      )}
      {fav.includes(movie.id) ? (
        <div className="add-favourites" onClick={() => handleFavourite(movie)}>
          {<svg
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
        </svg>}
        </div>
      ) : (
        <div className="add-favourites" onClick={() => handleFavourite(movie)}>
          {<svg
          width='2em'
          height='2em'
          viewBox='0 0 24 24'
          className='bi bi-heart-fill'
          fill='none'  
          stroke='red'
          overflow='visible'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
          />
        </svg>}
        </div>
      )}
    </div>
  );
};

export default AddFavourites;




