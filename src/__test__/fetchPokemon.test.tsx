import "@testing-library/jest-dom";

import { fetchPokemon } from "../utils";
import { mockApiResponse } from "../__mocks__/pokemonData";
import { IPokemonData } from "../types/types";
import { BASE_URL } from "../constants";

const searchString = "pikachu";
const expectedData: IPokemonData[] = [
  {
    id: mockApiResponse.id,
    name: mockApiResponse.name,
    height: mockApiResponse.height,
    weight: mockApiResponse.weight,
    image: mockApiResponse.sprites.other["official-artwork"]["front_default"],
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

  it("should fetch data for a single pokemon", async () => {
    const pokemon = await fetchPokemon(searchString);

    expect(globalThis.fetch).toHaveBeenCalledWith(`${BASE_URL}${searchString}`);
    expect(pokemon).toEqual(expectedData);
  });
});

// export const fetchPokemonMock = jest.fn().mockImplementation((name: string) => {
//   const pokemonData = [
//     {
//       id: 25,
//       name: "pikachu",
//       height: 50,
//       weight: 60,
//       sprites: {
//         other: {
//           "official-artwork": {
//             front_default: "pikachu.png",
//           },
//         },
//       },
//     },
//     {
//       id: 1,
//       name: "bulbasaur",
//       height: 45,
//       weight: 69,
//       sprites: {
//         other: {
//           "official-artwork": {
//             front_default: "bulbasaur.png",
//           },
//         },
//       },
//     },
//   ];

//   return Promise.resolve([pokemonData[name]]);
// });

// describe("fetchAllPokemon function", () => {
//   beforeEach(() => {
//     (fetchPokemonMock as jest.Mock).mockClear();
//   });

//   it("should fetch data for an array of pokemon on a given page and of a given limit", async () => {
//     const limit = "2";
//     const page = "1";
//     const offset = (Number(page) - 1) * Number(limit);

//     const results = await fetchAllPokemon(limit, page);

//     expect(fetchPokemonMock).toHaveBeenCalledWith(`${BASE_URL}?limit=${limit}&offset=${offset}}`);
//     expect(results).toEqual(expectedResults);
//   });
// });

// describe("fetchAllPokemon function", () => {
//   const mockResponse = {
//     json: async (): Promise<{ results: IPokemonBasic[] }> => mockBasicData,
//   };

//   const mockFetch = jest.fn().mockResolvedValue(mockResponse);

//   beforeEach(() => {
//     globalThis.fetch = mockFetch as jest.Mock;
//   });

//   afterEach(() => {
//     (globalThis.fetch as jest.Mock).mockClear();
//   });

//   it("should fetch data for an array of pokemon on a given page and of a given limit", async () => {
//     const limit = "2";
//     const page = "1";
//     const offset = (Number(page) - 1) * Number(limit);

//     const pikachuData = {
//       id: 25,
//       name: "pikachu",
//       height: 50,
//       weight: 60,
//       sprites: {
//         other: {
//           "official-artwork": {
//             front_default: "pikachu.png",
//           },
//         },
//       },
//     };

//     const bulbasaurData = {
//       id: 1,
//       name: "bulbasaur",
//       height: 45,
//       weight: 69,
//       sprites: {
//         other: {
//           "official-artwork": {
//             front_default: "bulbasaur.png",
//           },
//         },
//       },
//     };

//     const mockFetchAll = jest.mock("../utils/fetchPokemon", () => ({
//       fetchPokemon: jest.fn().mockImplementation((name: string) => {
//         if (name === "pikachu") return Promise.resolve([pikachuData]);
//         if (name === "bulbasaur") return Promise.resolve([bulbasaurData]);
//         return Promise.resolve([]);
//       }),
//     }));

//     const results = await fetchAllPokemon(limit, page);

//     const expectedResults = [pikachuData, bulbasaurData];

//     expect(mockFetchAll).toHaveBeenCalledWith(`${BASE_URL}?limit=${limit}&offset=${offset}}`);
//     expect(results).toEqual(expectedResults);
//   });
// });
