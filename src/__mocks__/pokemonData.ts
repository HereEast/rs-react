import { IPokemonData, IPokemonApiResponse, IPokemonBasic } from "../types/types";

export const mockPokemonData: IPokemonData = {
  id: 1,
  name: "pikachu",
  weight: 20,
  height: 40,
  image: "pikachu.png",
};

export const mockPokemonDataAll: IPokemonData[] = [
  {
    id: 1,
    name: "pikachu",
    weight: 20,
    height: 40,
    image: "pikachu.png",
  },
  {
    id: 2,
    name: "bulbasaur",
    weight: 20,
    height: 40,
    image: "bulbasaur.png",
  },
];

export const mockApiResponse: IPokemonApiResponse = {
  id: 1,
  name: "pikachu",
  weight: 20,
  height: 40,
  sprites: {
    other: {
      "official-artwork": {
        front_default: "pikachu.png",
      },
    },
  },
};

export const mockApiResponseAll: IPokemonApiResponse[] = [
  {
    id: 1,
    name: "pikachu",
    weight: 20,
    height: 40,
    sprites: {
      other: {
        "official-artwork": {
          front_default: "pikachu.png",
        },
      },
    },
  },
  {
    id: 2,
    name: "bulbasaur",
    weight: 20,
    height: 40,
    sprites: {
      other: {
        "official-artwork": {
          front_default: "bulbasaur.png",
        },
      },
    },
  },
];

export const mockBasicApiData: IPokemonBasic[] = [
  { name: "pikachu", url: "pikachu.png" },
  { name: "bulbasaur", url: "bulbasaur.png" },
];
