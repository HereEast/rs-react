import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPokemon, fetchPokemon } from "../../../utils";

export interface IAllPokemonThunkProps {
  limit: string;
  page: string;
}

export const pokemonThunk = createAsyncThunk("pokemon/getPokemon", async (pokemonName: string, { rejectWithValue }) => {
  try {
    const result = await fetchPokemon(pokemonName);
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const allPokemonThunk = createAsyncThunk(
  "pokemon/getAllPokemon",
  async ({ limit, page }: IAllPokemonThunkProps, { rejectWithValue }) => {
    try {
      const result = await fetchAllPokemon(limit, page);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
