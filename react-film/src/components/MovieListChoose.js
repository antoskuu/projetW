import React, { useState, useEffect } from 'react';
import '../App.css';
import AddChoosed from './AddChoosed';
import getMovieDetails from './requests/getMovieDetails';

const MovieListChoose = ({ movies, selectedType, combinedMovies, setCombinedMovies}) => {
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    setSelectedMovie(null); // Réinitialiser le film sélectionné
  }, [movies]);


  const handleMouseOver = async (movieId) => {
    try {
      const movieData = await getMovieDetails({ selectedType, movieId });
      setSelectedMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleMouseLeave = () => {
    setSelectedMovie(null);
  };

  return (
    <React.Fragment>
      {movies.map((movie, index) => (
        <div
          className='image-container d-flex justify-content-start m-3'
          key={index}
          onMouseOver={() => handleMouseOver(movie.id)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={selectedType === "movie" ? movie.title : movie.name}
          />
          {selectedMovie && ( // Afficher les détails uniquement si un film est sélectionné
            <div className='overlay d-flex align-items-center justify-content-center'>
              <AddChoosed movie={selectedMovie} selectedType={selectedType} combinedMovies={combinedMovies} setCombinedMovies={setCombinedMovies} />
            </div>
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default MovieListChoose;

