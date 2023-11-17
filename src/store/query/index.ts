import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPokemonApiResponse } from "../../types/types";
import { BASE_URL } from "../../constants";

export interface IResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonApiResponse[];
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemon: builder.query<IPokemonApiResponse, string>({
      query: (name: string) => `${name}`,
    }),

    getAllPokemon: builder.query({
      async queryFn({ limit, page }, _queryApi, _extraOptions, fetchWithBQ) {
        const offset = (Number(page) - 1) * Number(limit);
        const URL = `${BASE_URL}?limit=${limit}&offset=${offset}`;

        const response = await fetchWithBQ(URL);
        const data = response.data as IResponseData;

        const pokemonDataPromises = data.results.map(async (arr) => {
          const response = await fetchWithBQ(arr.name);

          if (!response.data) {
            return { error: response.error };
          }

          return response.data;
        });

        const promiseResults = await Promise.all(pokemonDataPromises);
        const results = promiseResults.map((res) => res) as IPokemonApiResponse[];

        return { data: results };
      },
    }),
  }),
});

export const { useGetPokemonQuery } = pokemonApi;
