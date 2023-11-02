import { IPokemonData, IPokemonBasicData } from "../types/types";

export async function fetchPokemon(searchString: string): Promise<IPokemonData[]> {
  const URL = searchString
    ? `https://pokeapi.co/api/v2/pokemon/${searchString}`
    : "https://pokeapi.co/api/v2/pokemon?limit=300";

  const response = await fetch(URL);

  if (!response.ok) {
    throw Error("Pokemon not found. Try again!");
  }

  const data = await response.json();

  if (searchString) {
    const pokemon = await getPokemon(searchString);
    return [pokemon];
  } else {
    const pokemonArray = await getAllPokemon(data.results);
    return pokemonArray;
  }
}

export async function getPokemon(searchString: string): Promise<IPokemonData> {
  const URL = `https://pokeapi.co/api/v2/pokemon/${searchString}`;

  const response = await fetch(URL);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    image: data.sprites.other["official-artwork"]["front_default"] || "",
  };
}

export async function getAllPokemon(dataArray: IPokemonBasicData[]): Promise<IPokemonData[]> {
  const pokemonDataPromises = dataArray.map(async (data) => {
    const response = await getPokemon(data.name);
    return response;
  });

  const pokemonData = await Promise.all(pokemonDataPromises);
  return pokemonData;
}
