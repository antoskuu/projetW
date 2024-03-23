import getFeatured from "./getFeatured";

const getMovieRequest = async (selectedType, searchValue) => {
    if (searchValue === '') {
      const featuredMovies = await getFeatured(selectedType);
      return(featuredMovies);
    } else {
      const url = `https://api.themoviedb.org/3/search/${selectedType}?query=${searchValue}&sort_by=popularity.desc&api_key=f33b828f3a9d89dcc02bf38eaea2b131&language=fr-FR`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        return(responseJson.results);
      }
    }
  };

export default getMovieRequest;