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

const imagePoke = document.querySelector('.card-image');
const namePoke = document.getElementById('name-pokemon');

const fragment = document.createDocumentFragment();

const pokemons = [];

const getPokemon = (info) => {
  pokemons.push({
    nombre: info.name,
    altura: info.height,
    peso: info.weight,
    image: info.sprites.front_default,
    exp: info.base_experience,
  });
};
