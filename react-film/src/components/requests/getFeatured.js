const getFeatured = async (selectedType) => {
    const url = `https://api.themoviedb.org/3/discover/${selectedType}?api_key=f33b828f3a9d89dcc02bf38eaea2b131&sort_by=popularity.desc&language=fr-FR`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      return(responseJson.results);
    }
  };

export default getFeatured;