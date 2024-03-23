import React, { useState, useEffect } from 'react';
import MovieListChoose from '../components/MovieListChoose';
import generateImage from '../components/requests/generateImage';
import getFeatured from '../components/requests/getFeatured';
import getMovieRequest from '../components/requests/getMovieRequest';

const GamePage = ({ selectedType, searchValue }) => {
  const [movies, setMovies] = useState([]);
  const [combinedMovies, setCombinedMovies] = useState([]);
  const [generatedImage, setGeneratedImage] = useState('');

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

  // Fonction pour générer l'image
  const handleGenerateImage = async () => {
    if (combinedMovies.length === 2) {
      const imageUrl = await generateImage(combinedMovies[0].title, combinedMovies[1].title);
      setGeneratedImage(imageUrl);
    } else {
      console.log("Veuillez sélectionner deux films pour fusionner.");
    }
  };
  
  return (
    <div className='container-fluid movie-app'>
      <h1 className="big-texts">Choisissez deux films à combiner</h1>
  
      <h1 className="big-texts">{selectedType === 'movie' ? (searchValue !== '' ? `Résultats de films contenant : ${searchValue}` : 'Les films du moment') : (searchValue !== '' ? `Résultats de séries contenant : ${searchValue}` : 'Les séries du moment')}</h1>
      <div className='row'>
        <MovieListChoose movies={movies} selectedType={selectedType} combinedMovies={combinedMovies} setCombinedMovies={setCombinedMovies}/>
      </div>
  
      <h1 className="big-texts">Les films sélectionnés :</h1>
  
      <div className='film-container'>
        <div className='film-column'>
          <h2>Film 1 : {selectedType === 'movie' ? (combinedMovies[0] ? combinedMovies[0].title : 'A choisir') : (combinedMovies[0] ? combinedMovies[0].name : 'A choisir')}</h2>
          {combinedMovies[0] && (
            <div className='movie-container'>
              <img
                className='image-container'
                src={`https://image.tmdb.org/t/p/original${combinedMovies[0].poster_path}`}
                alt='Film 1'
              />
              <p>{combinedMovies[0].overview}</p>
            </div>
          )}
        </div>
        <div className='film-column'>
          <h2>Film 2 : {selectedType === 'movie' ? (combinedMovies[1] ? combinedMovies[1].title : 'A choisir') : (combinedMovies[1] ? combinedMovies[1].name : 'A choisir')}</h2>
          {combinedMovies[1] && (
            <div className='movie-container'>
              <img
                src={`https://image.tmdb.org/t/p/original${combinedMovies[1].poster_path}`}
                alt='Film 2'
                className='image-container'
              />
              <p>{combinedMovies[1].overview}</p>
            </div>
          )}
        </div>
      </div>
      <div className='bouton-serie-film'>
        <button onClick={() => setCombinedMovies([])} className='boutton_effacer'>
          Effacer
        </button>
      </div>
      <div className='bouton-serie-film'>
        <button onClick={handleGenerateImage} className='boutton_effacer'>
          FUSIOOOOOOOON
        </button>
      </div>
      {generatedImage && (
        <div>
          <h1 className="big-texts">Image Fusionnée :</h1>
          <img src={generatedImage} alt="Image fusionnée" />
        </div>
      )}
    </div>
  );
};

export default GamePage;
