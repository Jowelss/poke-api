const imgPoke = document.createElement('img');
imgPoke.classList.add('card-image');
const imgPokeContent = document.getElementById('image-pokemon');

const namePoke = document.getElementById('name-pokemon');
const weightPoke = document.getElementById('card-info__weight');
const expPoke = document.getElementById('card-info__exp');
const heightPoke = document.getElementById('card-info__height');

const fragment = document.createDocumentFragment();

const buttonBack = document.getElementById('button-back');
const buttonNext = document.getElementById('button-next');

const pokemons = [];

let num = 0;

const addPokeCard = () => {
  imgPoke.src = pokemons[num].image;
  namePoke.textContent = pokemons[num].nombre;
  expPoke.textContent = pokemons[num].exp;
  heightPoke.textContent = pokemons[num].altura;
  weightPoke.textContent = pokemons[num].peso;
  imgPokeContent.appendChild(imgPoke);
};

buttonNext.addEventListener('click', () => {
  if (num < pokemons.length) {
    num++;
  }
  addPokeCard();
});

buttonBack.addEventListener('click', () => {
  if (num > 0) {
    num--;
  }
  addPokeCard();
});

const fetchPokemonData = async () => {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
    );

    const data = await response.json();
    const pokemonPromises = data.results.map(async (element) => {
      try {
        const res = await fetch(element.url);
        const info = await res.json();
        return {
          nombre: info.name,
          altura: info.height,
          peso: info.weight,
          exp: info.base_experience,
          image: info.sprites.front_default,
        };
      } catch (error) {
        console.log(error);
      }
    });

    const pokemonData = await Promise.all(pokemonPromises);
    pokemons.push(...pokemonData);
    addPokeCard(pokemons);
  } catch (error) {
    console.log(error);
  }
};

fetchPokemonData();
