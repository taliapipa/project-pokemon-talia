// Obtener referencias a los elementos HTML
const listaPokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("searchInput");
const pokeFavsContainer = document.getElementById("pokefavs");

// Variable que almacenará los datos de la API
let allPokemon = [];

// Función para obtener los datos de la API
const getApi = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`;
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
      <h2 class="card-title">${pokemon.name}</h2>
      <h3 class="card-subtitle">${pokemon.type}</h3>
      <p class="card-subtitle">${pokemon.id}</p>
      <img src="iconos/pngegg.png" alt="" class="like" id="like"/>
      <img src="iconos/pngegg (1).png" alt="" class="liked" id="liked"/>
    `;

    // Agregar el elemento li a la lista
    listaPokedex.appendChild(li);
  }
};

// Función para filtrar los Pokemon según la búsqueda
const filterPokemon = (query) => {
  const filteredResults = allPokemon.filter(item => item.name.toLowerCase().includes(query));

  // Mapear los datos filtrados para obtener los detalles de cada Pokemon
  const pokemonData = filteredResults.map(async (result) => {
    const resp = await fetch(result.url);
    const pokemonDetails = await resp.json();

    return {
      name: pokemonDetails.name,
      image: pokemonDetails.sprites.front_default,
      type: pokemonDetails.types.map(type => type.type.name).join(", "),
      id: pokemonDetails.id
    };
  });

  // Esperar a que se resuelvan todas las promesas y luego renderizar los Pokemon filtrados en la pantalla
  Promise.all(pokemonData).then(renderPokemon);
};

// Evento para manejar la entrada en el campo de búsqueda
searchInput.addEventListener("input", (ev) => {
  const query = ev.target.value.toLowerCase();
  filterPokemon(query);
});

// Evento para favoritos
listaPokedex.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("like")) {
    const card = ev.target.parentNode;
    const name = card.querySelector(".card-title").textContent;
    const image = card.querySelector(".card").src;

    const pokemon = {
      name: name,
      image: image
    };

    toggleFavorite(pokemon, ev.target);
    renderFavs();

  }
});

// Función para agregar o quitar un Pokemon favorito
const toggleFavorite = (pokemon, button) => {
  const index = pokeFavs.findIndex((fav) => fav.name === pokemon.name);
  if (index !== -1) {
    // Si el Pokemon ya es un favorito, eliminarlo del array de favoritos
    pokeFavs.splice(index, 1);
    button.src = "iconos/pngegg.png"; // Cambiar la imagen del botón a "like"
  } else {
    // Si el Pokemon no es un favorito, agregarlo al array de favoritos
    pokeFavs.push(pokemon);
    button.src = "iconos/pngegg (1).png"; // Cambiar la imagen del botón a "liked"
  }

};

localStorage.setItem("objetoUser", listaPokedex);


// Función para renderizar los Pokemon favoritos en la pantalla
const renderFavs = () => {
  pokeFavsContainer.innerHTML = "";
  for (const poke of pokeFavs) {
    const pokeDiv = document.createElement("div");
    const pokeName = document.createElement("p");
    pokeName.textContent = poke.name;
    const pokeImage = document.createElement("img");
    pokeImage.src = poke.image;
    pokeDiv.appendChild(pokeName);
    pokeDiv.appendChild(pokeImage);
    pokeFavsContainer.appendChild(pokeDiv);
  }
};

//Función para quitar favoritos

// Variables para almacenar los Pokemon favoritos
let pokeFavs = [];

// Función principal para iniciar el programa
const init = async () => {
  // Obtener los datos de la API
  await getApi();

  // Renderizar todos los Pokemon en la pantalla inicialmente
  filterPokemon("");

  // Enfocar el campo de búsqueda al cargar la página
  searchInput.focus();

  const getLocal = JSON.parse(localStorage.getItem("objetoUser", listaPokedex))
  console.log(getLocal)
};

// Llamar a la función init() para iniciar el programa
init();
