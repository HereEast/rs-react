import { pokemonDetailsReducer, initialPokemonSlice } from "../../store/pokemonDetails/slice";
import { pokemonDetailsThunk } from "../../store/pokemonDetails/thunk";
import { ERROR__DETAILS } from "../../constants";

const payloadValue = [
  { id: 1, name: "Pikachu" },
  { id: 2, name: "Charmander" },
];

describe("Redux pokemonDetails slice: ", () => {
  test("should return default state when passed an empty action", () => {
    const result = pokemonDetailsReducer(undefined, { type: "" });
    expect(result).toEqual(initialPokemonSlice);
  });

  test("should handle pokemonDetailsThunk.fulfilled", () => {
    const action = {
      type: pokemonDetailsThunk.fulfilled.type,
      payload: payloadValue,
    };

    const state = pokemonDetailsReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("success");
    expect(state.pokemonDetails).toEqual(payloadValue);

    expect(state.isLoading).toEqual(false);
  });

  test("should handle pokemonThunk.pending", () => {
    const action = {
      type: pokemonDetailsThunk.pending.type,
      payload: initialPokemonSlice,
    };

    const state = pokemonDetailsReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("loading");
    expect(state.isLoading).toEqual(true);
  });

  test("should handle pokemonThunk.rejected", () => {
    const action = {
      type: pokemonDetailsThunk.rejected.type,
      payload: initialPokemonSlice,
    };

    const state = pokemonDetailsReducer(initialPokemonSlice, action);

    expect(state.status).toEqual("error");
    expect(state.error).toEqual(ERROR__DETAILS);
  });
});
