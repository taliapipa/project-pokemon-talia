
// Obtener referencias a los elementos HTML
const listaPokedex = document.getElementById("pokedex");

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
const renderPokemon = () => {
  // Mapear los datos de la API para crear un array de objetos con los datos de cada Pokemon
const pokemon = allPokemon.map((result) => ({
    name: result.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.url.split('/')[6]}.png`,
    type: "",
    id: result.url.split('/')[6]
}));

  // Bucle for of para crear los elementos HTML para cada Pokemon y agregarlos a la lista
for (const pokemonData of pokemon) {
    // Crear un elemento li para cada Pokemon
    const li = document.createElement("li");

    // Crear el contenido HTML para el elemento li con los datos del Pokemon
    li.innerHTML = `
    <img src="${pokemonData.image}" alt="">
    <h2>${pokemonData.name}</h2>
    <h3>${pokemonData.type}</h3>
    <p>${pokemonData.id}</p>
    `;

    // Agregar el elemento li a la lista
    listaPokedex.appendChild(li);
}
};

//Crear el div 

const div = document.createElement("div");
div.innerHTML = `
<input type="text" id="searchInput" placeholder="Buscar...">
<ul id="resultsList"></ul> `;

//traer el input a JS

const searchInput = document.querySelector("#searchInput");

//Crear el event
input.addEventListener("input", handleInputSearch);

//funcion event

function handleInputSearch(ev){
  const pokeSearch = ev.target.value;
  
}



// Función principal para iniciar el programa
const init = async () => {
  // Obtener los datos de la API
await getApi();

  // Renderizar los datos en la pantalla
renderPokemon();
};

// Llamar a la función init() para iniciar el programa
init();
