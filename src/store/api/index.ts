import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

// interface PokemonData {
//   id: number;
//   name: string;
//   weight: number;
//   height: number;
//   image: string;
// }

// interface PokemonResponse {
//   data?: PokemonData;
//   error?: FetchBaseQueryError;
// }

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemon: builder.query({
      query: (name: string) => `${name}`,
    }),

    // getPokemon: builder.query<PokemonResponse, string>({
    //   async queryFn(name, _queryApi, _extraOptions, fetchWithBQ) {
    //     const response = await fetchWithBQ(name);

    //     if (!response.data) {
    //       return { error: response.error };
    //     }

    //     console.log(response.data.name);

    //     return { data: response.data };
    //   },
    // }),

    // getAllPokemon: builder.query({
    //   async queryFn({ limit, page }, _queryApi, _extraOptions, fetchWithBQ) {
    //     const offset = (Number(page) - 1) * Number(limit);
    //     const URL = `${BASE_URL}?limit=${limit}&offset=${offset}`;

    //     const response = await fetchWithBQ(URL);

    //     const pokemonDataPromises = response.data?.results.map(async (data) => {
    //       const response = await fetchWithBQ(data.name);
    //       return response.data;
    //     });

    //     const results = await Promise.all(pokemonDataPromises);

    //     for (const result of results) {
    //       if (!result.data) {
    //         return { error: response.error };
    //       }
    //     }

    //     const allPokemon = results.map((result) => result.data);
    //     return { data: allPokemon };
    //   },
    // }),
  }),
});

export const { useGetPokemonQuery, useLazyGetPokemonQuery } = pokemonApi;
