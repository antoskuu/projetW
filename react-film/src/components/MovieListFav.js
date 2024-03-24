import React, { useState, useEffect } from 'react';
import '../App.css';
import AddFavourites from './AddFavourites';
import getMovieDetails from './requests/getMovieDetails';
import InfoPage from '../pages/InfoPage';

const MovieListFav = ({ movies, selectedType, favDetails, setFavDetails }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [cliquedMovie, setCliquedMovie] = useState(null);
  const [showInfoPage, setShowInfoPage] = useState(false);
  
  useEffect(() => {
    // Cette fonction sera exécutée chaque fois que `movies` change
    setSelectedMovie(null); // Réinitialiser le film sélectionné
  }, [movies]);



  const handleClick = async (movieId) => {
    try {
      const movieData = await getMovieDetails({ selectedType, movieId });
      setSelectedMovie(movieData);
      setShowInfoPage(true);
      setCliquedMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
    
  }

if (showInfoPage && cliquedMovie) {
  return <InfoPage movie={cliquedMovie} setShowInfoPage={setShowInfoPage} />;
}
  const handleMouseOver = async (movieId) => {
    try {
      const movieData = await getMovieDetails({ selectedType, movieId });
      setSelectedMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleMouseLeave = () => {
    setSelectedMovie(null); // Réinitialiser les détails du film lorsque l'utilisateur quitte l'image
  };

  return (
    
    
    <React.Fragment>
      {movies.map((movie, index) => (
        <div
          className='image-container d-flex justify-content-start m-3'
          key={index}
          onMouseOver={() => handleMouseOver(movie.id)}
          onMouseLeave={handleMouseLeave} // Ajouter un gestionnaire d'événements onMouseLeave pour réinitialiser les détails du film
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={selectedType === "movie" ? movie.title : movie.name}
          />
          
          {favDetails.some(favMovie => favMovie.id === movie.id) && (
          <div className="add-favourites" ><svg
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
          </div>
      )}
          
          {selectedMovie && ( // Afficher les détails uniquement si un film est sélectionné
            <button
            className='invisible-button overlay d-flex align-items-center justify-content-center'
            onClick={() => handleClick(selectedMovie.id)}>
            <div className='overlay d-flex align-items-center justify-content-center'>
              <AddFavourites movie={selectedMovie} selectedType={selectedType} favDetails={favDetails} setFavDetails={setFavDetails} />
            </div>
          </button>
          )}
          
        </div>
      ))}
    </React.Fragment>
    
  );
};

export default MovieListFav;





