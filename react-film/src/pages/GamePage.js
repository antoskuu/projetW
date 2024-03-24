import React, { useState, useEffect } from 'react';
import '../FireButton.css'
import MovieListChoose from '../components/MovieListChoose';
import generateImage from '../components/requests/generateImage';
import generateSynopsis from '../components/requests/generateSynopsis';
import getFeatured from '../components/requests/getFeatured';
import getMovieRequest from '../components/requests/getMovieRequest';
import ExplosiveButton from '../components/ExplosiveButton';




const GamePage = ({ selectedType, changeSelectedType, searchValue }) => {
  const [movies, setMovies] = useState([]);
  const [combinedMovies, setCombinedMovies] = useState([]);
  const [generatedImage, setGeneratedImage] = useState('');
  const [generatedSynopsis, setGeneratedSynopsis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (generatedImage && generatedSynopsis) {
      setIsLoading(false);
    }
  }, [generatedImage, generatedSynopsis]);
  
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
  const handleGenerate = async () => {
    if (combinedMovies.length === 2) {
      const imageUrl = await generateImage(`${selectedType === 'movie' ? combinedMovies[0].title : combinedMovies[0].name} ${selectedType === 'movie' ? combinedMovies[1].title : combinedMovies[1].name}`);
      setGeneratedImage(imageUrl);
      const synopsis = await generateSynopsis(`${selectedType === 'movie' ? combinedMovies[0].title : combinedMovies[0].name} ${selectedType === 'movie' ? combinedMovies[1].title : combinedMovies[1].name}`);
      setGeneratedSynopsis(synopsis)
      setIsLoading(true);
    } else {
      console.log("Veuillez sélectionner deux films pour fusionner.");
    }
  };


  useEffect(() => {
    // Initialisez le bouton explosif après le rendu du composant
    const fusionButton = new ExplosiveButton("#fusionButton");
  }, []); // Assurez-vous de ne l'initialiser qu'une seule fois après le rendu initial
  

  return (
    <div className='container-fluid movie-app'>



{!searchValue && (
        <h1 className="big-texts">
          Choisissez deux
          <select 

  className='select-type'
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
          à combiner        </h1>
      )}


      {searchValue && (
        <h1 className="big-texts">
  Résultats de 
  <select 
  className='select-type'
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
      <div className='bouton-fusion'>
        <button onClick={() => {handleGenerate();if (combinedMovies.length === 2)setIsLoading(true); }} type="fire-button" id="fusionButton">FUSION</button>
      </div>
      <h1 className="big-texts">Oeuvre fusionnée :</h1>
      <div className='movie-container'>

      {isLoading ? (
  <div className="loading-spinner"></div>
) : (
  generatedImage && (
    <div className='result-container'>
      <img src={generatedImage} alt="Fusionnée" className='result-image'/>

      <p>{generatedSynopsis}</p>
    </div>
    
    
  )
)}

</div>
    </div>
  );
};

export default GamePage;
