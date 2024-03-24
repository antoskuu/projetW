import React, { useState, useEffect } from 'react';
import MovieListFav from '../components/MovieListFav';
import getFeatured from '../components/requests/getFeatured';
import getMovieRequest from '../components/requests/getMovieRequest';

const HomePage = ({ selectedType, changeSelectedType, searchValue }) => {
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
      
      {searchValue && (
        <h1 className="big-texts">
  Résultats de 
  <select 
  value={selectedType}
  onChange={(e) => changeSelectedType(e.target.value)}
  style={{
    backgroundColor: '#282828',
    border: 'none',
    color: '#ffffff',
    borderRadius: '5px',
    padding: '5px 10px',
    margin: '0 10px',
  }}
>
  <option value="movie">films</option>
  <option value="tv">séries</option>
</select>
  contenant "{searchValue}"
</h1>
      )}

{!searchValue && (
        <h1 className="big-texts">
          Les
          <select 
  value={selectedType}
  onChange={(e) => changeSelectedType(e.target.value)}
  style={{
    backgroundColor: '#282828',
    border: 'none',
    color: '#ffffff',
    borderRadius: '5px',
    padding: '5px 10px',
    margin: '0 10px',
  }}
>
  <option value="movie">films</option>
  <option value="tv">séries</option>
</select>
          du moment        </h1>
      )}

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
