import React, { useState, useEffect } from 'react';
import MovieListFav from '../components/MovieListFav';
import getMovieDetails from '../components/requests/getMovieDetails';

const InfoPage = ({ movie, setShowInfoPage }) => {
      console.log(movie)
    return (
        <div>
            <button onClick={() => setShowInfoPage(false)}>Retour</button>
            <h1>{movie.title}</h1>
            {movie.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
            )}
        </div>
      );
}



export default InfoPage;