import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Details } from "./index";
import { useFetchPokemon } from "../../hooks";

interface IUseFetchPokemon {
  getPokemon: jest.Mock;
  getAllPokemon: jest.Mock;
  isLoading: boolean;
  error: string;
}

interface IContext {
  selectedItem: string;
}

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: (): IContext => ({
    selectedItem: "Pokemon",
  }),
}));

jest.mock("../../hooks/useFetchPokemon");

describe("Details component", () => {
  test("should show Loader when data is fetching", async () => {
    (useFetchPokemon as jest.Mock<IUseFetchPokemon>).mockReturnValue({
      getPokemon: jest.fn(),
      getAllPokemon: jest.fn(),
      isLoading: true,
      error: "",
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    expect(useFetchPokemon).toHaveBeenCalledTimes(1);

    const loader = screen.getByText(/loading/i);
    expect(loader).toBeInTheDocument();
  });
});
