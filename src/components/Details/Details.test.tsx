import "@testing-library/jest-dom";

import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Details } from "./index";
import * as useFetchPokemon from "../../hooks/useFetchPokemon";

const mockSetSelectedItem = jest.fn();
const mockedUsedNavigate = jest.fn();

interface IContext {
  selectedItem: string;
  setSelectedItem: jest.Mock;
}

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: (): IContext => ({
    selectedItem: "pikachu",
    setSelectedItem: mockSetSelectedItem,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: (): jest.Mock => mockedUsedNavigate,
}));

const useFetchPokemonMock = jest.spyOn(useFetchPokemon, "useFetchPokemon");

describe("Details component", () => {
  test("should show loader when data is fetching", async () => {
    useFetchPokemonMock.mockReturnValue({
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

    const loader = screen.getByText(/loading/i);
    expect(loader).toBeInTheDocument();
  });

  test("should show error message if failed to fetch data", async () => {
    useFetchPokemonMock.mockReturnValue({
      getPokemon: jest.fn(),
      getAllPokemon: jest.fn(),
      isLoading: false,
      error: "Oops!.. Something wrong. Try again!",
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    const error = screen.getByText(/Oops!.. Something wrong. Try again!/i);
    expect(error).toBeInTheDocument();
  });

  test("should correctly display the detailed card data", async () => {
    useFetchPokemonMock.mockReturnValue({
      getPokemon: jest.fn(),
      getAllPokemon: jest.fn(),
      isLoading: false,
      error: "",
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    const panel = screen.getByTestId("details");
    expect(panel).toBeInTheDocument();

    const heading = await within(panel).findByRole("heading", { name: /pikachu/i });
    // const button = within(panel).getByRole("button", { name: /close/i });

    // expect(button).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
