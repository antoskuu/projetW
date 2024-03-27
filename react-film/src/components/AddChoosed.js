import React from 'react';

const AddChoosed = ({ movie, selectedType, combinedMovies, setCombinedMovies}) => {

  // Vérifie si le film est déjà dans combinedMovies
  const isInCombinedMovies = combinedMovies.some(item => item.id === movie.id);

  // Fonction pour ajouter ou supprimer le film de combinedMovies
  const handleAddRemoveMovie = () => {
    // Vérifier si la liste combinedMovies contient déjà deux éléments
    if (combinedMovies.length === 2 && !isInCombinedMovies) {
      alert("Déjà deux films sélectionnés");
      return; // Arrêter l'exécution de la fonction si la limite est atteinte
    }

    if (isInCombinedMovies) {
      // Retirer le film de combinedMovies
      const updatedCombinedMovies = combinedMovies.filter(item => item.id !== movie.id);
      setCombinedMovies(updatedCombinedMovies);
    } else {
      // Ajouter le film à combinedMovies
      setCombinedMovies([...combinedMovies, movie]);
    }
  };

  return (
    <div className="movie-details">
      <h2 className="title">{selectedType === "movie" ? movie.title : movie.name}</h2>
      <p className="description">{movie.overview}</p>

      <div className="number-icons">
        <svg className="number-icon" onClick={handleAddRemoveMovie} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="red" fill={isInCombinedMovies ? "red" : "none"} />
        </svg>
      </div>
      {combinedMovies.length === 2 && !isInCombinedMovies && (
        <p style={{ color: 'red' }}>Déjà deux films sélectionnés</p>
      )}

    </div>
  );
};

export default AddChoosed;
