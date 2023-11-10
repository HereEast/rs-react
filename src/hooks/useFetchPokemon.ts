import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPokemonData } from "../types/types";
import { fetchPokemon, fetchAllPokemon, getSearchParam } from "../utils";
import { ERROR_POKEMON, ERROR_ALL_POKEMON } from "../constants";

interface IUseFetchPokemon {
  isLoading: boolean;
  error: string;
  getPokemon: (queryString: string) => Promise<IPokemonData[] | undefined>;
  getAllPokemon: () => Promise<IPokemonData[] | undefined>;
}

export function useFetchPokemon(): IUseFetchPokemon {
  const [searchParams] = useSearchParams();

  const page = getSearchParam(searchParams, "page");
  const limit = getSearchParam(searchParams, "limit");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function getPokemon(queryString: string): Promise<IPokemonData[] | undefined> {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchPokemon(queryString);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(ERROR_POKEMON);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllPokemon(): Promise<IPokemonData[] | undefined> {
    setIsLoading(true);
    setError("");

    try {
      const { results } = await fetchAllPokemon(limit, page);
      return results;
    } catch (error) {
      if (error instanceof Error) {
        setError(ERROR_ALL_POKEMON);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { getPokemon, getAllPokemon, isLoading, error };
}
