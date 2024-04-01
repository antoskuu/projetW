import React from 'react';

const MovieDetails = ({ movie, selectedType }) => {
  return (
    <div>
      <h2>{selectedType === "movie" ? movie.title : movie.name}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetails;
