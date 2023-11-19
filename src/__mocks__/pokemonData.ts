import { IPokemonData, IPokemonApiResponse } from "../types/types";

export const mockPokemonData: IPokemonData = {
  id: 1,
  name: "pikachu",
  weight: 20,
  height: 40,
  image: "pikachu.png",
};

export const mockApiResponse: IPokemonApiResponse = {
  id: 1,
  name: "pikachu",
  weight: 20,
  height: 40,
  sprites: {
    other: {
      "official-artwork": {
        front_default: "pikachu.png",
        front_shiny: "",
      },
    },
  },
};
