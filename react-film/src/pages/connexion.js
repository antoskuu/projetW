import React, { Component } from 'react';
import './connexion.css';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      errorMessage: "" 
    };
    this.API_URL = "http://localhost:5038/";
  }

  addClick = async () => {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    fetch(this.API_URL + "api/website/CheckWord?word=" + login + "&password=" + password)
  .then(response => response.json())
  .then(result => { 
    this.setState({ result, errorMessage: "" });
    Cookies.set('userID', result, { expires: 1 });
    this.props.goToHome();
  })
  .catch(error => {
    this.setState({ errorMessage: "Une erreur s'est produite. Veuillez réessayer." });
  });
  };

  render() {
    const { result, errorMessage } = this.state;
    return (
            <div className="App">
              <h2>Page de Connexion</h2>
              <input id="login" placeholder="Entrez votre login" />&nbsp;
              <input id="password" type="password" placeholder="Entrez votre mot de passe" />&nbsp; {/* Champs de mot de passe */}
              <button onClick={() => this.addClick()}>Se Connecter</button>
              {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Afficher les messages d'erreur */}
            </div>
    );
  }
}

export default App;