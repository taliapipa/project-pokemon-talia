
//Traer la Ol  a JS
const listaPokedex = document.getElementById("pokedex");


//API
const getPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((response) => response.json())
    .then((data) => console.log({data}))
};

//Mapear
const pokemon = results.map((result) => ({
    name: result.name,
    image: result.sprites['front_default'],
    type: result.types.map((type) => type.type.name).join(', '),
    id: result.id
}));

//Bucle for of para pintar en la pantalla

for (const pokemon of pokemon) {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${pokemon.image}" alt=""></img>
    <h2>${pokemon.name}</h2>
    <h3>${pokemon.type}</h3>
    <p>${pokemon.id}</p>
    `;
    listaPokedex.appendChild(li);
};
