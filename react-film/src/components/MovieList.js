import React from 'react';
import '../App.css';

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  const handleClick = (movieId) => {
    props.getMovieDetails(movieId); // Utiliser la fonction getMovieDetails passée en tant que prop
  };

  return (
    <React.Fragment>
      {props.movies.map((movie, index) => (
        <div className='image-container d-flex justify-content-start m-3' key={index}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt='movie'
            onClick={() => handleClick(movie.id)}
          />
          <div className='overlay d-flex align-items-center justify-content-center'>
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default MovieList;
