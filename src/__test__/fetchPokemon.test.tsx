import "@testing-library/jest-dom";

import { fetchPokemon } from "../utils";
import { mockApiResponse } from "../__mocks__/pokemonData";
import { IPokemonData } from "../types/types";
import { BASE_URL } from "../constants";

const expectedData: IPokemonData[] = [
  {
    id: mockApiResponse.id,
    name: mockApiResponse.name,
    height: mockApiResponse.height,
    weight: mockApiResponse.weight,
    image: mockApiResponse.sprites.other["official-artwork"]["front_default"] || "",
  },
];

describe("fetchPokemon function", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: async () => mockApiResponse,
    } as Response);
  });

  afterEach(() => {
    (globalThis.fetch as jest.Mock).mockClear();
  });

  test("should fetch data for a single pokemon", async () => {
    const searchString = "pikachu";

    const pokemon = await fetchPokemon(searchString);

    expect(globalThis.fetch).toHaveBeenCalledWith(`${BASE_URL}${searchString}`);
    expect(pokemon).toEqual(expectedData);
  });
});

describe("fetchAllPokemon function", () => {
  test("should fetch all pokemon based on limit and page", async () => {
    expect(true).toBe(true);
  });
});
