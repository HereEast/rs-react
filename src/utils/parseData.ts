import { IPokemonApiResponse, IPokemonData } from "../types/types";

export function parseData(data: IPokemonApiResponse): IPokemonData {
  const parsedData = {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    image: data.sprites.other["official-artwork"]["front_default"],
  };

  return parsedData;
}
