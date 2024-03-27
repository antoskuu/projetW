
  import React, { useState } from 'react';

  const InscriptionPage = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [result, setResult] = useState(null);
    const API_URL = "http://localhost:5038/";
    const register = () => {
      var login = document.getElementById("login").value;
      var password = document.getElementById("password").value;
      fetch(API_URL + "api/website/InsertCustomer", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ word: login, password: password })
      })
      .then(response => response.json())
      .then(result => {
          if (result.error) {
              setErrorMessage(result.error);
              alert(result.error);
          } else {
              setResult(result);
              setErrorMessage("");
              props.goToConnexionPage(); // Utilisez props au lieu de this.props
          }
      })
      .catch(error => {
          setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      });
    };
  
    return (
      <div className="App">
        <h2>Page d'Inscription</h2>
        <input id="login" placeholder="Entrez votre login" />&nbsp;
        <input id="password" type="password" placeholder="Entrez votre mot de passe" />&nbsp;
        <button onClick={register}>S'inscrire</button>
      </div>
    );
  };
  
  export default InscriptionPage;