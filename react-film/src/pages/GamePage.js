import React, { useState, useEffect } from 'react';
import MovieListChoose from '../components/MovieListChoose';

import getFeatured from '../components/requests/getFeatured';
import getMovieRequest from '../components/requests/getMovieRequest';

const GamePage = ({ selectedType, searchValue }) => {
  const [movies, setMovies] = useState([]);
  const [combinedMovies, setCombinedMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue === '') {
        const featuredMovies = await getFeatured(selectedType);
        setMovies(featuredMovies);
      } else {
        const searchedMovies = await getMovieRequest(selectedType, searchValue);
        setMovies(searchedMovies);
      }
    };
  
    fetchData();
  }, [selectedType, searchValue]);
  

  return (
    <div className='container-fluid movie-app'>

      <h1 className="big-texts">Choisissez deux films à combiner</h1>


      <h1 className="big-texts">{selectedType === 'movie' ? (searchValue !== '' ? `Résultats de films contenant : ${searchValue}` : 'Les films du moment') : (searchValue !== '' ? `Résultats de séries contenant : ${searchValue}` : 'Les séries du moment')}</h1>
      <div className='row'>
        <MovieListChoose movies={movies} selectedType={selectedType} combinedMovies={combinedMovies} setCombinedMovies={setCombinedMovies}/>
      </div>

      <h1 className="big-texts">Les films sélectionnés :</h1>

      <h2>Film 1 : {selectedType === 'movie' ? (combinedMovies[0] ? combinedMovies[0].title : 'A choisir') : (combinedMovies[0] ? combinedMovies[0].name : 'A choisir')}</h2>
      {combinedMovies[0] && (
        <div className="movie-container">
          <img
            className='image-container'
            src={`https://image.tmdb.org/t/p/original${combinedMovies[0].poster_path}`}
            alt='Film 1'
          />
          <p>{combinedMovies[0].description}</p>
        </div>
      )}
      <h2>Film 2 : {selectedType === 'movie' ? (combinedMovies[1] ? combinedMovies[1].title : 'A choisir') : (combinedMovies[1] ? combinedMovies[1].name : 'A choisir')}</h2>
      {combinedMovies[1] && (
        <div className="movie-container">
          <img
            src={`https://image.tmdb.org/t/p/original${combinedMovies[1].poster_path}`}
            alt='Film 2'
            className='image-container'
          />
          <p>{combinedMovies[1].description}</p>
        </div>
      )}

    </div>
  );
};

export default GamePage;
