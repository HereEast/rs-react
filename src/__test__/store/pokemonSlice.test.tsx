import { pokemonReducer, initialPokemonSlice } from "../../store/pokemon/slice";
import { pokemonThunk, allPokemonThunk } from "../../store/pokemon/thunk";
import { ERROR_POKEMON, ERROR_ALL_POKEMON } from "../../constants";

const payloadValue = [
  { id: 1, name: "Pikachu" },
  { id: 2, name: "Charmander" },
];

describe("Redux pokemon slice: ", () => {
  test("should return default state when passed an empty action", () => {
    const result = pokemonReducer(undefined, { type: "" });
    expect(result).toEqual(initialPokemonSlice);
  });

  test("should handle pokemonThunk.fulfilled", () => {
    const action = {
      type: pokemonThunk.fulfilled.type,
      payload: payloadValue,
    };

    const state = pokemonReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("success");
    expect(state.searchResults).toEqual(payloadValue);

    expect(state.isLoading).toEqual(false);
  });

  test("should handle pokemonThunk.pending", () => {
    const action = {
      type: pokemonThunk.pending.type,
      payload: initialPokemonSlice,
    };

    const state = pokemonReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("loading");
    expect(state.isLoading).toEqual(true);
  });

  test("should handle pokemonThunk.rejected", () => {
    const action = {
      type: pokemonThunk.rejected.type,
      payload: initialPokemonSlice,
    };

    const state = pokemonReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("error");
    expect(state.error).toEqual(ERROR_POKEMON);
  });

  test("should handle allPokemonThunk.fulfilled", () => {
    const action = {
      type: allPokemonThunk.fulfilled.type,
      payload: payloadValue,
    };

    const state = pokemonReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("success");
    expect(state.searchResults).toEqual(payloadValue);

    expect(state.isLoading).toEqual(false);
  });

  test("should handle allPokemonThunk.pending", () => {
    const action = {
      type: allPokemonThunk.pending.type,
      payload: initialPokemonSlice,
    };

    const state = pokemonReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("loading");
    expect(state.isLoading).toEqual(true);
  });

  test("should handle allPokemonThunk.rejected", () => {
    const action = {
      type: allPokemonThunk.rejected.type,
      payload: initialPokemonSlice,
    };

    const state = pokemonReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("error");
    expect(state.error).toEqual(ERROR_ALL_POKEMON);
  });
});
