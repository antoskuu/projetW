import React from 'react';
import '../App.css';

const MovieList = ({ movies, favouriteComponent, getMovieDetails, selectedType }) => {
  const handleClick = (movieId) => {
    getMovieDetails(selectedType, movieId);
  };
  const handleMouseOver = (movieId) => {
    getMovieDetails(selectedType, movieId); // Utiliser la fonction getMovieDetails passée en tant que prop
  };
  return (
    <React.Fragment>
      {movies.map((movie, index) => (
        <div 
          className='image-container d-flex justify-content-start m-3' 
          key={index}
          onMouseOver={() => handleMouseOver(movie.id)} // Ajoutez cette ligne
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt='movie'
            onClick={() => handleClick(movie.id)}
          />
          <div className='overlay d-flex align-items-center justify-content-center'>
            <favouriteComponent />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default MovieList;
