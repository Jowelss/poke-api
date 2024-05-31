// Para ahorrarme el agregar muchas variables
const elements = {
  imgPoke: document.querySelector('.card-image'),
  imgPokeContent: document.getElementById('image-pokemon'),

  colorGradient: document.getElementById('color-gradient'),

  namePoke: document.getElementById('name-pokemon'),
  weightPoke: document.getElementById('card-info__weight'),
  expPoke: document.getElementById('card-info__exp'),
  heightPoke: document.getElementById('card-info__height'),
  colorPoke: document.getElementById('color-pokemon'),

  fragment: document.createDocumentFragment(),

  buttonBack: document.getElementById('button-back'),
  buttonNext: document.getElementById('button-next'),

  charging: document.querySelector('.charging'),
};

const pokemons = [];

let currentIndex = 0;

const addPokeCard = () => {
  const pokemon = pokemons[currentIndex]; // Almacena el elemento

  if (!pokemon) return; //

  elements.imgPoke.src = pokemon.image;

  elements.namePoke.textContent = pokemon.nombre.toUpperCase();

  elements.expPoke.textContent = pokemon.exp;

  elements.heightPoke.textContent = pokemon.altura;

  elements.weightPoke.textContent = pokemon.peso;

  elements.colorGradient.style.background = `linear-gradient(${pokemon.color}, var(--backgroundColor-black) 70%)`;

  elements.buttonBack.disabled = currentIndex === 0;
  elements.buttonNext.disabled = currentIndex === pokemons.length - 1;
};

elements.buttonNext.addEventListener('click', () => {
  currentIndex++;
  addPokeCard();
});

elements.buttonBack.addEventListener('click', () => {
  currentIndex--;

  addPokeCard();
});

const fetchPokemonData = async () => {
  try {
    elements.charging.style.animationName = 'charging';
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
    );

    const data = await response.json();
    const pokemonPromises = data.results.map(async (element) => {
      try {
        const res = await fetch(element.url);
        const info = await res.json();

        const resColor = await fetch(info.species.url);
        const colorPoke = await resColor.json();

        return {
          nombre: info.name,
          altura: info.height,
          peso: info.weight,
          exp: info.base_experience,
          image: info.sprites.front_default,
          color: colorPoke.color.name,
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
  } finally {
    elements.charging.style.animationName = 'none';
    elements.charging.style.display = 'none';
  }
};

fetchPokemonData();
