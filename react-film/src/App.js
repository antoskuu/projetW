import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import MovieDetails from './components/MovieDetails'; // Nouveau composant pour les détails du film

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // Nouvel état pour les détails du film sélectionné

  const getFeaturedMovies = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=f33b828f3a9d89dcc02bf38eaea2b131&sort_by=popularity.desc&language=fr-FR`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };

  const getMovieRequest = async (searchValue) => {
    if (searchValue === '') {
      await getFeaturedMovies();
    } else {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&sort_by=popularity.desc&api_key=f33b828f3a9d89dcc02bf38eaea2b131&language=fr-FR`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        setMovies(responseJson.results);
      }
    }
  };

  const getMovieDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=f33b828f3a9d89dcc02bf38eaea2b131&language=fr-FR`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setSelectedMovie(responseJson);
    }
  };

  useEffect(() => {
    getFeaturedMovies();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        getMovieRequest(searchValue);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [searchValue]);

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Films de baisés' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} favouriteComponent={AddFavourites} getMovieDetails={getMovieDetails} /> {/* Passer la fonction getMovieDetails au composant MovieList */}
      </div>
      {selectedMovie && (
        <div className='row'>
          <div className='col'>
            <MovieDetails movie={selectedMovie} />
          </div>
        </div>
      )}
      <h1>Films en favoris</h1>
    </div>
   
  );
};

export default App;
