import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPokemonData } from "../types/types";
import { fetchPokemon, fetchAllPokemon } from "../utils";

interface IUseFetchPokemon {
  isLoading: boolean;
  searchResults: IPokemonData[];
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  getPokemon: (queryString: string) => Promise<void>;
  getAllPokemon: () => Promise<void>;
}

export function useFetchPokemon(): IUseFetchPokemon {
  const [searchParams] = useSearchParams();

  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function getPokemon(queryString: string): Promise<void> {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchPokemon(queryString);
      setSearchResults(result);
    } catch (error) {
      if (error instanceof Error) {
        setError("We don't have this Pokémon.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllPokemon(): Promise<void> {
    setIsLoading(true);
    setError("");

    try {
      const { results } = await fetchAllPokemon(searchParams.toString());
      setSearchResults(results);
    } catch (error) {
      if (error instanceof Error) {
        setError("Couldn't fetch any Pokémon. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, searchResults, getPokemon, getAllPokemon, error, setError };
}

// export function useFetching(callback): IUseFetchPokemon {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function fetching(): Promise<void> {
//     setIsLoading(true);
//     setError("");

//     try {
//       await callback();
//     } catch (error) {
//       if (error instanceof Error) {
//         setError("We don't have this Pokémon.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return { fetching, isLoading, error };
// }
