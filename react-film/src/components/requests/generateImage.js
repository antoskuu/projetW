const generateImage = async (filmA, filmB) => {
    try {
      console.log(filmA, filmB)
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzIyNjU0NjQtMzVhNC00NTMwLTlkZTUtMDkzNWQ2MWE2MGU5IiwidHlwZSI6ImFwaV90b2tlbiJ9.fv5yretT5X8Jfi7E2psUB2A7WGecpivw_KY_Maze-1A",
        },
        body: JSON.stringify({
          providers: "amazon",
          text: `Create a high-resolution movie poster amalgamating the visual aesthetics of two renowned films: ${filmA} and ${filmB}. The poster should portray a vivid and dynamic scene, intricately weaving together iconic characters from each film into a cohesive narrative. Pay close attention to detail, ensuring the characters blend seamlessly and naturally within the composition. The foreground should feature prominent characters engaging in action or interaction, while the background should provide context and depth to the scene. Emphasize clarity and realism, with sharp and vibrant colors to captivate viewers attention. Absolutely no text or logos should be present on the poster; let the image alone convey the essence of the combined cinematic worlds. Aim for a visually stunning and immersive artwork that sparks curiosity and imagination, inviting viewers to explore the intriguing fusion of these two beloved films.`,
          resolution: "512x512",
          fallback_providers: "",
        }),
      };
  
      const response = await fetch("https://api.edenai.run/v2/image/generation", options);
      const data = await response.json();

      return(data.amazon.items[0].image_resource_url);
    } catch (error) {
      console.error(error);
    }
  };

  export default generateImage;