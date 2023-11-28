import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemon, getError } from "../../../utils";

export const pokemonDetailsThunk = createAsyncThunk(
  "pokemonDetails/getPokemonDetails",
  async (pokemonName: string, { rejectWithValue }) => {
    try {
      const [result] = await fetchPokemon(pokemonName);
      return result;
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  },
);
