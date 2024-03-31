import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import SearchBox from './components/SearchBox'
import ChatWindow from './components/ChatWindow';
import ConnexionPage from './pages/connexion';
import InscriptionPage from './pages/inscription'; 
import Cookies from 'js-cookie';
import FindGamePage from './pages/FindGamePage';



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
  const id = Cookies.get('userID');
  
  const changeSelectedType = (newType) => {
    setSelectedType(newType);
  };
  const goToHome = () => {
    setCurrentPage('home');
  };

  const goToGamePage = () => {
    setCurrentPage('game');
  };

  const goToConnexionPage = () => { // Nouvelle fonction pour aller à la page de connexion
    setCurrentPage('connexion');
  };

  const goToFindGamePage = () => { // Nouvelle fonction pour aller à la page de connexion
    setCurrentPage('findgame');
  };

  const handleSearch = async (searchValue) => {
    setSearchValue(searchValue);
  };

  const goToInscriptionPage = () => { // Nouvelle fonction pour aller à la page d'inscription
    setCurrentPage('inscription');
  };

  useEffect(() => {
    goToHome();
  }, []);

  let page;
  switch(currentPage) {
    case 'home':
      page = <HomePage selectedType={selectedType} changeSelectedType={changeSelectedType} searchValue={searchValue}/>;
      break;
    
    case 'game':
      page = <GamePage selectedType={selectedType} changeSelectedType={changeSelectedType} searchValue={searchValue}/>;
      break;
    case 'findgame':
      page = <FindGamePage/>;
      break;
    case 'connexion':
      page = <ConnexionPage goToHome={goToHome} />;  
      break;
    case 'inscription':
      page = <InscriptionPage goToConnexionPage={goToConnexionPage} />; // Passez la fonction en tant que prop
    break;
    default:
      page = <HomePage selectedType={selectedType} changeSelectedType={changeSelectedType} searchValue={searchValue}/>;
  }

  return (
    <div>
      <header className="header">
      <button className="h1-button-style" onClick={goToHome}>
  <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo"style={{width: '150px', height: '150px'}} />
</button>
<div className="films_series">
  
    
</div>
<div className="dropdown">
  <button className="header-button"onClick={goToHome}>Accueil</button>
  <div className="dropdown-content">
    <button className="header-button" onClick={() => {goToHome(); setSelectedType('movie');}}>Films</button>
    <button className="header-button" onClick={() => {goToHome(); setSelectedType('tv');}}>Séries</button>
  </div>
</div>

<div className="dropdown">
  <button className="header-button"onClick={goToGamePage}>Jeux</button>
  <div className="dropdown-content">
  <button className="header-button" onClick={goToGamePage}>Fusion</button>
  <button className="header-button" onClick={goToFindGamePage}>Devine</button>
  </div>
</div>
        <SearchBox handleSearch={handleSearch}/>
        <div className="connexion_inscription">
  {id === undefined ? (
    <React.Fragment>
      <button className="header-button" onClick={goToConnexionPage}>Connexion</button>
      <button className="header-button" onClick={goToInscriptionPage}>Inscription</button>
    </React.Fragment>
  ) : (
    <span>Vous êtes connecté</span>
  )}
</div>
      </header>
      {page}
      <div>


      {id === undefined ? (
        <React.Fragment>
        
      </React.Fragment>
      ) : (
        <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} messages={messages} setMessages={setMessages}/>
      )}



        
      </div>
      
    </div>
  );
};

export default App;
