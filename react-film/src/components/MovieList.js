import React, { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    // Votre logique de rafraîchissement ici
    // Cette fonction sera exécutée chaque fois que `movies` ou `selectedType` change
  }, [movies, selectedType]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    // Cette fonction sera exécutée chaque fois que `movies` change
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
            alt='movie'
          />
          {selectedMovie && ( // Afficher les détails uniquement si un film est sélectionné
            <div className='overlay d-flex align-items-center justify-content-center'>
              <AddFavourites movie={selectedMovie} selectedType={selectedType} />
            </div>
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default MovieList;
