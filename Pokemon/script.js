const input = document.getElementById('pokemonInput');
const button = document.getElementById('searchBtn');
const pokemonInfo = document.getElementById('pokemonInfo');
const errorMsg = document.getElementById('errorMsg');

async function fetchPokemon(pokemon) {
  try {
    errorMsg.textContent = '';
    pokemonInfo.innerHTML = 'Loading...';

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }

    const data = await response.json();

    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const imageUrl = data.sprites.front_default || '';
    const types = data.types.map(type => type.type.name).join(', ');

    pokemonInfo.innerHTML = `
      <h2>${name}</h2>
      <img src="${imageUrl}" alt="${name}" />
      <p>Type: ${types}</p>
    `;
  } catch (error) {
    pokemonInfo.innerHTML = '';
    errorMsg.textContent = error.message;
  }
}

button.addEventListener('click', () => {
  const pokemon = input.value.trim();
  if (pokemon) {
    fetchPokemon(pokemon);
  } else {
    errorMsg.textContent = 'Please enter a Pokémon name or ID.';
    pokemonInfo.innerHTML = '';
  }
});

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    button.click();
  }
});
