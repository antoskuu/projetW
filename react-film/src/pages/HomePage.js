import React, { useState, useEffect } from 'react';
import MovieListFav from '../components/MovieListFav';
import getFeatured from '../components/requests/getFeatured';
import getMovieRequest from '../components/requests/getMovieRequest';

const HomePage = ({ selectedType, searchValue }) => {
  const [movies, setMovies] = useState([]);
  const [favDetails, setFavDetails] = useState(JSON.parse(localStorage.getItem('fav_details')) || []);


  const effacerFavoris = () => {
    localStorage.setItem('favourites', JSON.stringify([]));
    localStorage.setItem('fav_details', JSON.stringify([]));
    setFavDetails([]);
  };

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
      <h1 className="big-texts">{selectedType === 'movie' ? (searchValue !== '' ? `Résultats de films contenant : ${searchValue}` : 'Les films du moment') : (searchValue !== '' ? `Résultats de séries contenant : ${searchValue}` : 'Les séries du moment')}</h1>
      <div className='row'>
        <MovieListFav movies={movies} selectedType={selectedType} favDetails={favDetails} setFavDetails={setFavDetails} />
      </div>

      <h1 className="big-texts">Vos favoris :</h1>
      <div className='row'>
        <MovieListFav movies={favDetails} selectedType={selectedType} favDetails={favDetails} setFavDetails={setFavDetails} />
      </div>
      <div className='bouton-serie-film'>
        <button onClick={effacerFavoris} className='boutton_effacer'>
          Effacer
        </button>
      </div>
    </div>
  );
};

export default HomePage;
