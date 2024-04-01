function separateStrings(inputString) {
  // Séparation de la chaîne en parties selon le séparateur "Synopsis : "
  const parts = inputString.split("Synopsis : ");

  const titreString = parts[0].trim();
  const synopsisString = "Synopsis : " + parts[1].trim();
  console.log(titreString)
  console.log(synopsisString)
  return [titreString, synopsisString];
}




const generateSynopsis = async (filmA, filmB) => {
    try {
      console.log(filmA, filmB)
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzIyNjU0NjQtMzVhNC00NTMwLTlkZTUtMDkzNWQ2MWE2MGU5IiwidHlwZSI6ImFwaV90b2tlbiJ9.fv5yretT5X8Jfi7E2psUB2A7WGecpivw_KY_Maze-1A",
        },
        body: JSON.stringify({
            "providers": "openai",
            "text": `En français : Créez un titre et un synopsis combinés pour les deux films : ${filmA} et ${filmB}. Le titre et le synopsis doivent être humoristiques et bien intégrés. Veuillez suivre le format ci-dessous : Titre : [Votre titre combiné] Synopsis : [Votre synopsis combiné].`,
            "temperature": 0.7,
            "max_tokens": 1000,
            "fallback_providers": ""
        }),
      };
  
      const response = await fetch("https://api.edenai.run/v2/text/generation", options);
      const data = await response.json();
      console.log(data)

      return(separateStrings(data.openai.generated_text));
    } catch (error) {
      console.error(error);
    }
  };

  export default generateSynopsis;