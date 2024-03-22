import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [movies, setMovies] = useState([]);
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

  useEffect(() => {
    getFeatured(selectedType);
  }, [selectedType]);

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='TC-Movies' />
        <SearchBox handleSearch={handleSearch} />
      </div>
      <div className='bouton-serie-film'>
        <button id='bouton-film' onClick={() => { setSelectedType('movie'); }} disabled={selectedType === 'movie'}>
          Film
        </button>
        <button id='bouton-serie' onClick={() => { setSelectedType('tv'); }} disabled={selectedType === 'tv'}>
          Série
        </button>
      </div>
      <div className='row'>
        <MovieList movies={movies} selectedType={selectedType} />
      </div>
      <h1>Films en favoris</h1>
      {/* Fenêtre de chat */}
      <div>
        <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default App;
