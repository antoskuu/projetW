import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import FavoriteList from './components/FavoriteList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import ChatWindow from './components/ChatWindow';
import AddFavourites from './components/AddFavourites';
const App = () => {
  const [movies, setMovies] = useState([]);
  const fav_details = JSON.parse(localStorage.getItem('fav_details'));
  const fav = JSON.parse(localStorage.getItem('favourites'));
  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState('movie');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messages = [
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
    // Ajoutez plus de messages au besoin
  ];

  const getFeatured = async (selectedType) => {
    const url = `https://api.themoviedb.org/3/discover/${selectedType}?api_key=f33b828f3a9d89dcc02bf38eaea2b131&sort_by=popularity.desc&language=fr-FR`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };


function Header() {
  return (
    <header className="header">
      <button className="header-button">Films</button>
      <button className="header-button">Séries</button>
      <button className="header-button">Connexion</button>
      <button className="header-button">Inscription</button>
      <div className="search-bar">
        <input type="text" placeholder="Recherche..." />
      </div>
    </header>
  );
}


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


  /* useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        getMovieRequest(selectedType, searchValue);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selectedType, searchValue]); */
  


  const effacer_favoris = () => {
    localStorage.setItem('favourites', JSON.stringify([]));
    localStorage.setItem('fav_details', JSON.stringify([]));
    window.location.reload();
  
  };

  

  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        getMovieRequest(selectedType, searchValue);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selectedType, searchValue]);

  useEffect(() => {
    getFeatured(selectedType);
  }, [selectedType]);


  return (
    
    <div className='container-fluid movie-app'>
    <header className="header">
    <MovieListHeading heading='TC-Movies' />
      <button className="header-button"onClick={() => { setSelectedType('movie'); }} disabled={selectedType === 'movie'}>Films</button>
      <button className="header-button"onClick={() => { setSelectedType('tv'); }} disabled={selectedType === 'tv'}>Séries</button>
      <button className="header-button">Connexion</button>
      <button className="header-button">Inscription</button>
      
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} className="search-bar"/>

    </header>
      
      <div className='row'>
        <MovieList movies={movies} selectedType={selectedType} />
      </div>
      {/* Fenêtre de chat */}
      <div>
        <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} messages={messages} />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Mes Favoris' />
        
        
      </div>
      
      <div className='row'>
        <FavoriteList movies={fav_details} selectedType={selectedType} />
      </div>
      <div className='bouton-serie-film'>
        
        <button id='bouton-effacer' onClick={effacer_favoris} className='bouton_effacer'>
          Effacer
        </button>
        
      </div>

    </div>
  );
};

export default App;
