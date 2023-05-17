// Obtener referencias a los elementos HTML
const listaPokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("searchInput");

// Variable que almacenará los datos de la API
let allPokemon = [];

// Función para obtener los datos de la API
const getApi = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=150`;
  const resp = await fetch(url);
  const respJson = await resp.json();

  // Guardar los datos en la variable allPokemon
  allPokemon = [...respJson.results];
};

// Función para renderizar los datos en la pantalla
const renderPokemon = (pokemonData) => {
  // Limpiar la lista de Pokemon previos
  listaPokedex.innerHTML = "";

  // Bucle for of para crear los elementos HTML para cada Pokemon y agregarlos a la lista
  for (const pokemon of pokemonData) {
    // Crear un elemento li para cada Pokemon
    const li = document.createElement("li");

    // Crear el contenido HTML para el elemento li con los datos del Pokemon
    li.innerHTML = `
      <img src="${pokemon.image}" alt="" class="card">
      <h2 class:"card-title">${pokemon.name}</h2>
      <h3 class:".card-subtitle">${pokemon.type}</h3>
      <p class:".card-subtitle">${pokemon.id}</p>
      <img src="
    `;

    // Agregar el elemento li a la lista
    listaPokedex.appendChild(li);
  }
};

// Función para filtrar los Pokemon según la búsqueda
const filterPokemon = (query) => {
  const filteredResults = allPokemon.filter(item => item.name.toLowerCase().includes(query));

  // Mapear los datos filtrados para obtener los detalles de cada Pokemon
  const pokemonData = filteredResults.map((result) => ({
    name: result.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.url.split('/')[6]}.png`,
    type: "",
    id: result.url.split('/')[6]
  }));

  // Renderizar los Pokemon filtrados en la pantalla
  renderPokemon(pokemonData);
};

// Evento para manejar la entrada en el campo de búsqueda
searchInput.addEventListener("input", (ev) => {
  const query = ev.target.value.toLowerCase();
  filterPokemon(query);
});

//

// Función principal para iniciar el programa
const init = async () => {
  // Obtener los datos de la API
  await getApi();

  // Renderizar todos los Pokemon en la pantalla inicialmente
  filterPokemon("");

  // Enfocar el campo de búsqueda al cargar la página
  searchInput.focus();
};

// Llamar a la función init() para iniciar el programa
init();

