import "@testing-library/jest-dom";

import { parseData } from "../utils";
import { mockPokemonData, mockApiResponse } from "../__mocks__/pokemonData";

describe("parseData function", () => {
  test("should return correct parsed object", () => {
    const parsedData = parseData(mockApiResponse);
    expect(parsedData).toEqual(mockPokemonData);
  });
});
