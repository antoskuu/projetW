import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState('movie'); // Nouvel état pour les détails du film sélectionné

  const getFeatured = async (selectedType) => {
    const url = `https://api.themoviedb.org/3/discover/${selectedType}?api_key=f33b828f3a9d89dcc02bf38eaea2b131&sort_by=popularity.desc&language=fr-FR`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };

  const getMovieRequest = async (selectedType,searchValue) => {
    if (searchValue === '') {
      await getFeatured(selectedType); // Passer le type sélectionné à la fonction getFeatured
    } else {
      const url = `https://api.themoviedb.org/3/search/${selectedType}?query=${searchValue}&sort_by=popularity.desc&api_key=f33b828f3a9d89dcc02bf38eaea2b131&language=fr-FR`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        setMovies(responseJson.results);
      }
    }
  };



  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        getMovieRequest(selectedType,searchValue);
      }
    };
  
    window.addEventListener('keypress', handleKeyPress);
  
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selectedType,searchValue]);
  
  useEffect(() => {
    getFeatured(selectedType);
    
  }, [selectedType]); // Mettre à jour lorsque le type sélectionné change

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='TC-Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> {/* Passer le placeholder à SearchBox */}
      </div>
      <div className='bouton-serie-film'>
        <button id='bouton-film' onClick={() => {setSelectedType('movie');}} disabled={selectedType === 'movie'}>
          Film
        </button>
        <button id='bouton-serie' onClick={() => {setSelectedType('tv');}} disabled={selectedType === 'tv'}>
          Série
        </button>
      </div>
      <div className='row'>
      <MovieList movies={movies} selectedType={selectedType} />
      </div>
      <h1>Films en favoris</h1>
    </div>
  );
};

export default App;
