import "@testing-library/jest-dom";

// import { RootState } from "../store/store";
import { initialPokemonData } from "../constants";

export const initialSearchString = {
  searchString: "",
};

export const initialLimit = {
  limit: "",
};

export const initialPokemon = {
  status: "initial",
  error: "",
  isLoading: false,
  searchResults: [initialPokemonData],
};

// export const storeMock: RootState = {
//   searchString: initialSearchString,
//   limit: initialLimit,
//   pokemon: initialPokemon,
//   pokemonApi: initialPokemonApi,
// };

// export const store = configureStore({
//   reducer: {
//     searchString: searchStringReducer,
//     limit: limitReducer,
//     pokemon: pokemonReducer,
//     [pokemonApi.reducerPath]: pokemonApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
// });
