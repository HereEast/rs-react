import { fetchPokemon, fetchAllPokemon } from "../../utils";
import { pokemonThunk, allPokemonThunk } from "../../store/pokemon/thunk";

jest.mock("../../utils", () => ({
  fetchPokemon: jest.fn(),
  fetchAllPokemon: jest.fn(),
}));

describe("Async Thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("pokemonThunk should dispatch fulfilled action on successful fetch", async () => {
    const pokemonName = "pikachu";
    const mockResult = { id: 25, name: "Pikachu" };

    (fetchPokemon as jest.Mock).mockResolvedValueOnce(mockResult);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await pokemonThunk(pokemonName)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "pokemon/getPokemon/fulfilled",
        payload: mockResult,
      }),
    );
  });

  test("allPokemonThunk should dispatch fulfilled action on successful fetch", async () => {
    const queryParams = { limit: "10", page: "1" };
    const mockResult = [
      { id: 25, name: "Pikachu" },
      { id: 26, name: "Charmander" },
    ];

    (fetchAllPokemon as jest.Mock).mockResolvedValueOnce(mockResult);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await allPokemonThunk(queryParams)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "pokemon/getAllPokemon/fulfilled",
        payload: mockResult,
      }),
    );
  });
});
