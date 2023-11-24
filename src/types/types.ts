export interface IPokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string | null;
}

export interface IInitialPokemonSlice {
  status: string;
  error: string;
  isLoading: boolean;
  searchResults: IPokemonData[];
}

export interface IPokemonBasic {
  name: string;
  url: string;
}

interface IPokemonSprites {
  other: {
    "official-artwork": {
      front_default: string | null;
    };
  };
}

export interface IPokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: IPokemonSprites;
}
