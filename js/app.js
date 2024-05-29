fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((element) => {
      fetch(element.url)
        .then((res) => res.json())
        .then((data) => getPokemon(data))
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.log(err));

const getPokemon = (data) => {
  const pokemon = {
    nombre: data.name,
    image: data.sprites.front_default,
  };
};
