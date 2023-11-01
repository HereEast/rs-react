import { IPokemonData, IPokemonBasicData } from "../types/types";

export async function getPokemon(data: string | IPokemonBasicData[]): Promise<IPokemonData[]> {
  if (typeof data === "string") {
    const pokemon = await getPokemonData(data);
    return [pokemon];
  } else {
    const pokemonArray = await getAllPokemonData(data);
    return pokemonArray;
  }
}

export async function getPokemonData(searchString: string): Promise<IPokemonData> {
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

export async function getAllPokemonData(dataArray: IPokemonBasicData[]): Promise<IPokemonData[]> {
  const pokemonDataPromises = dataArray.map(async (data) => {
    const response = await getPokemonData(data.name);
    return response;
  });

  const pokemonData = await Promise.all(pokemonDataPromises);
  return pokemonData;
}
