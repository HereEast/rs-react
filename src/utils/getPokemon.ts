import { BASE_URL } from "../constants";
import { IPokemonData } from "../types/types";

export async function getPokemon(searchString: string): Promise<IPokemonData[]> {
  const URL = `${BASE_URL}${searchString}`;

  const response = await fetch(URL);
  const data = await response.json();

  return [
    {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      image: data.sprites.other["official-artwork"]["front_default"] || "",
    },
  ];
}

export async function getAllPokemon(queryString: string): Promise<IPokemonData[]> {
  const URL = `${BASE_URL}?${queryString}`;

  const response = await fetch(URL);
  const data = await response.json();

  const pokemonDataPromises = data.results.map(async (data: IPokemonData) => {
    const response = await getPokemon(data.name);
    return response[0];
  });

  const pokemonData = await Promise.all(pokemonDataPromises);
  return pokemonData;
}

// export async function getAllPokemon(page: string = "1", limit: string = LIMIT): Promise<IPokemonData[]> {
//   const URL = `${BASE_URL}?limit=${limit}&offset=${page}`;

//   const response = await fetch(URL);
//   const data = await response.json();

//   const pokemonDataPromises = data.results.map(async (data) => {
//     const response = await getPokemon(data.name);
//     return response[0];
//   });

//   const pokemonData = await Promise.all(pokemonDataPromises);
//   return pokemonData;
// }
