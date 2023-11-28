import { createSlice } from "@reduxjs/toolkit";
import { pokemonDetailsThunk } from "../thunk";
import { ERROR__DETAILS, initialPokemonData } from "../../../constants";
import { IPokemonData } from "../../../types/types";

export interface IPokemonSlice {
  status: string;
  error: string;
  isLoading: boolean;
  pokemonDetails: IPokemonData;
}

export const initialPokemonSlice: IPokemonSlice = {
  status: "initial",
  error: "",
  isLoading: false,
  pokemonDetails: initialPokemonData,
};

export const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState: initialPokemonSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pokemonDetailsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.pokemonDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(pokemonDetailsThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.isLoading = true;
      })
      .addCase(pokemonDetailsThunk.rejected, (state) => {
        state.status = "error";
        state.error = ERROR__DETAILS;
        state.isLoading = false;
      });
  },
});

export const pokemonDetailsReducer = pokemonDetailsSlice.reducer;
