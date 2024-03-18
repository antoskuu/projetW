import React, { useState } from 'react';
import '../App.css';
import AddFavourites from './AddFavourites';

const getMovieDetails = async ({ selectedType, movieId }) => {
  const url = `https://api.themoviedb.org/3/${selectedType}/${movieId}?api_key=f33b828f3a9d89dcc02bf38eaea2b131&language=fr-FR`;
  const response = await fetch(url);
  const responseJson = await response.json();

  if (responseJson) {
    return responseJson;
  }
};

const MovieList = ({ movies, selectedType }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMouseOver = async (movieId) => {
    try {
      const movieData = await getMovieDetails({ selectedType, movieId });
      setSelectedMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
    }
  };

  return (
    <React.Fragment>
      {movies.map((movie, index) => (
        <div
          className='image-container d-flex justify-content-start m-3'
          key={index}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt='movie'
            onMouseOver={() => handleMouseOver(movie.id)}
          />
          <div className='overlay d-flex align-items-center justify-content-center'>
              <AddFavourites movie={selectedMovie} selectedType={selectedType} />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default MovieList;
