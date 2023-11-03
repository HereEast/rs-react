import { useState } from "react";
import { IPokemonData } from "../types/types";
import { getPokemon, getAllPokemon } from "../utils/getPokemon";

type UseFetchingReturn = [
  (page?: string, limit?: string) => Promise<void>,
  IPokemonData[],
  boolean,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export function useFetching(): UseFetchingReturn {
  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function fetchData(page?: string, limit?: string): Promise<void> {
    setIsLoading(true);
    setIsError(false);

    const searchString = localStorage.getItem("searchString") || "";

    try {
      if (searchString) {
        const result = await getPokemon(searchString);
        setSearchResults(result);
      } else {
        const results = await getAllPokemon(page, limit);
        setSearchResults(results);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return [fetchData, searchResults, isLoading, isError, setIsError];
}
