import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favDetails, setFavDetails] = useState(JSON.parse(localStorage.getItem('fav_details')) || []);
  const [selectedType, setSelectedType] = useState('movie');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
  ]);


  const getFeatured = async (selectedType) => {
    const url = `https://api.themoviedb.org/3/discover/${selectedType}?api_key=f33b828f3a9d89dcc02bf38eaea2b131&sort_by=popularity.desc&language=fr-FR`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };

  const getMovieRequest = async (selectedType, searchValue) => {
    if (searchValue === '') {
      await getFeatured(selectedType);
    } else {
      const url = `https://api.themoviedb.org/3/search/${selectedType}?query=${searchValue}&sort_by=popularity.desc&api_key=f33b828f3a9d89dcc02bf38eaea2b131&language=fr-FR`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        setMovies(responseJson.results);
      }
    }
  };

  const handleSearch = (searchValue) => {
    getMovieRequest(selectedType, searchValue);
  };


  const effacerFavoris = () => {
    localStorage.setItem('favourites', JSON.stringify([]));
    localStorage.setItem('fav_details', JSON.stringify([]));
    setFavDetails([]); // Mise à jour de l'état local des favoris sans recharger la page
  };


  useEffect(() => {
    getFeatured(selectedType);
  }, [selectedType]);

  return (
    <div className='container-fluid movie-app'>
      <header className="header">
        <div className='title'>
        <h1>TC-Movies</h1>
        </div>
        <div className="films_series">
          <button className={`header-button ${selectedType === 'tv' ? 'selected' : ''}`} onClick={() => { setSelectedType('tv'); }}>Séries</button>
          <button className={`header-button ${selectedType === 'movie' ? 'selected' : ''}`} onClick={() => { setSelectedType('movie'); }}>Films</button>
        </div>
        <SearchBox handleSearch={handleSearch}/>
        <div className="connexion_inscription">
          <button className="header-button">Connexion</button>
          <button className="header-button">Inscription</button>
        </div>
      </header>
      
      <h1>{selectedType === 'movie' ? 'Les films du moment' : 'Les séries du moment'}</h1>
      
      <div className='row'>
        <MovieList movies={movies} selectedType={selectedType} favDetails={favDetails} setFavDetails={setFavDetails} />
      </div>
      
      {/* Fenêtre de chat */}
      <div>
        <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} messages={messages} setMessages={setMessages}/>
      </div>

      <div className='title'>
        <h1>Mes favoris</h1>
      </div>
      
      <div className='row'>
        <MovieList movies={favDetails} selectedType={selectedType} favDetails={favDetails} setFavDetails={setFavDetails} />
      </div>
      
      <div className='bouton-serie-film'>
        <button onClick={effacerFavoris} className='boutton_effacer'>
          Effacer
        </button>
      </div>
    </div>
  );
};

export default App;
