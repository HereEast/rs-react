export interface IPokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
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
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
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
