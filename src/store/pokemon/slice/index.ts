import { createSlice } from "@reduxjs/toolkit";
import { pokemonThunk, allPokemonThunk } from "../thunk";
import { ERROR_POKEMON, ERROR_ALL_POKEMON, initialPokemonData } from "../../../constants";
import { IInitialPokemonSlice } from "../../../types/types";

export const initialPokemonSlice: IInitialPokemonSlice = {
  status: "initial",
  error: "",
  isLoading: false,
  searchResults: [initialPokemonData],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialPokemonSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pokemonThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(pokemonThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.isLoading = true;
      })
      .addCase(pokemonThunk.rejected, (state) => {
        state.status = "error";
        state.error = ERROR_POKEMON;
        state.isLoading = false;
      })
      .addCase(allPokemonThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(allPokemonThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.isLoading = true;
      })
      .addCase(allPokemonThunk.rejected, (state) => {
        state.status = "error";
        state.error = ERROR_ALL_POKEMON;
        state.isLoading = false;
      });
  },
});

export const pokemonReducer = pokemonSlice.reducer;
