//import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    // Initialisation de l'état local de l'application
    this.state = {
      notes: []
    };
    this.API_URL = "http://localhost:5038/";
  }

  componentDidMount() {
    // Appel de la méthode pour rafraîchir les notes lors du montage du composant
    this.refreshNotes();
  }

  refreshNotes = async () => {
    // recup les notes via l'api
    fetch(this.API_URL + "api/website/GetCustomers")
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data });
      });
  };

  addClick = async () => {
    // Récupération de la valeur de la nouvelle note depuis l'élément avec l'id "newNotes"
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/website/InsertCustomer", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(result => {
        alert(result);
        this.refreshNotes();
      });
  };

  deleteClick = async id => {
    fetch(this.API_URL + "api/website/DeleteCustomer?id=" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        alert(result);
        this.refreshNotes();
      });
  };

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <h2>Todo App</h2>
        <input id="newNotes" />&nbsp;
        <button onClick={() => this.addClick()}>Add Notes</button>
        {notes.map(note => (
          <p key={note.id}>
            <b>La description : {note.description}</b>&nbsp;
            <button onClick={() => this.deleteClick(note.id)}>Delete Notes</button>
          </p>
        ))}
      </div>
    );
  }
}

export default App;
