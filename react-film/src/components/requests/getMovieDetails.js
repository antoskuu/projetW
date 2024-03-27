const getMovieDetails = async ({ selectedType, movieId }) => {
    const url = `https://api.themoviedb.org/3/${selectedType}/${movieId}?api_key=f33b828f3a9d89dcc02bf38eaea2b131&language=fr-FR`;
    const response = await fetch(url);
    const responseJson = await response.json();
  
    if (responseJson) {
      return responseJson;
    }
  };

export default getMovieDetails;