import React from 'react';

const InfoPage = ({ movie, setShowInfoPage }) => {
    console.log(movie)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <button onClick={() => setShowInfoPage(false)}>Retour</button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', width: '100%', alignItems: 'center' }}>
                <div>
                    <h1>{movie.title}</h1>
                    {movie.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
                    )}
                </div>
                <div>
                    <h2>{movie.overview}</h2>
                </div>
            </div>
        </div>
    );
}

export default InfoPage;