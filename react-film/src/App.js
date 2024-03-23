import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import SearchBox from './components/SearchBox'
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // État pour gérer la page actuelle
  const [selectedType, setSelectedType] = useState('movie');
  const [searchValue, setSearchValue] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { pseudo: "AG", content: "Bonjour ! Comment ça va ?" },
    { pseudo: "AG", content: "Tu regardes quoi comme film en ce moment ?" },
    { pseudo: "GF", content: "J'ai entendu parler d'un nouveau film qui est génial !" },
  ]);
  // Fonctions pour changer de page
  const goToHome = () => {
    setCurrentPage('home');
  };

  const goToGamePage = () => {
    setCurrentPage('game');
  };

  const handleSearch = async (searchValue) => {
    setSearchValue(searchValue);
  };

  useEffect(() => {
    goToHome();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>TC-Movies</h1>
        <div className="films_series">
          <button className="header-button" onClick={() => { setSelectedType('tv'); }}>Séries</button>
          <button className="header-button" onClick={() => { setSelectedType('movie'); }}>Films</button>
        </div>
        <SearchBox handleSearch={handleSearch}/>
        <div className="connexion_inscription">
          <button className="header-button">Connexion</button>
          <button className="header-button">Inscription</button>
        </div>
      </header>
      <button onClick={goToHome}>Accueil</button>
      <button onClick={goToGamePage}>Jeu</button>
      {currentPage === 'home' ? <HomePage selectedType={selectedType} searchValue={searchValue}/> : <GamePage selectedType={selectedType} searchValue={searchValue}/>}
      <div>
        <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} messages={messages} setMessages={setMessages}/>
      </div>
    </div>
  );
};

export default App;
