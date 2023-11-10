import { BASE_URL } from "../constants";
import { IPokemonData } from "../types/types";

interface IFetchAllPokemon {
  results: IPokemonData[];
  count: string;
}

export async function fetchPokemon(searchString: string): Promise<IPokemonData[]> {
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

export async function fetchAllPokemon(limit: string, page: string): Promise<IFetchAllPokemon> {
  const offset = (Number(page) - 1) * Number(limit);
  const URL = `${BASE_URL}?limit=${limit}&offset=${offset}`;

  const response = await fetch(URL);
  const data = await response.json();

  const pokemonDataPromises = data.results.map(async (data: IPokemonData) => {
    const response = await fetchPokemon(data.name);
    return response[0];
  });

  const results = await Promise.all(pokemonDataPromises);
  return { results: results, count: String(data.count) };
}
