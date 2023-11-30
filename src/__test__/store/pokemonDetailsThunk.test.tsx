import { fetchPokemon } from "../../utils";
import { pokemonDetailsThunk } from "../../store/pokemonDetails/thunk";

jest.mock("../../utils", () => ({
  fetchPokemon: jest.fn(),
}));

describe("Async Thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("pokemonDetailsThunk should dispatch fulfilled action on successful fetch", async () => {
    const pokemonName = "pikachu";
    const mockResult = { id: 25, name: "Pikachu" };

    (fetchPokemon as jest.Mock).mockResolvedValueOnce([mockResult]);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await pokemonDetailsThunk(pokemonName)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "pokemonDetails/getPokemonDetails/fulfilled",
        payload: mockResult,
      }),
    );
  });
});
