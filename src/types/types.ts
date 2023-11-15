export interface IPokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}

export interface IPokemonBasicData {
  name: string;
  url: string;
}

export interface IInitialPokemonSlice {
  status: string;
  error: string;
  isLoading: boolean;
  searchResults: IPokemonData[];
}
