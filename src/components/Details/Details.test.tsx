import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import user from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import { useRouter } from "next/router";
import { Details } from "./index";
import { mockPokemonData } from "../../__mocks__/pokemonData";

jest.mock("react-redux");

jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
    query: { details: "pikachu", limit: "30", page: "1" },
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

describe("Details component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should correctly display the detailed card data", async () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue({
      pokemonDetails: mockPokemonData,
      isLoading: false,
      error: "",
    });

    render(<Details />);

    const pokemonImage = screen.getByAltText(/Image of pikachu/i);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonWeight = screen.getByText(/Weight: 20/i);
    const pokemonHeight = screen.getByText(/Height: 40/i);

    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();

    const panel = screen.getByTestId("details");
    expect(panel).toBeInTheDocument();

    const heading = await within(panel).findByRole("heading", { name: /pikachu/i });
    expect(heading).toBeInTheDocument();
  });

  test("should hide component clicking on Close button", async () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue({
      pokemonDetails: mockPokemonData,
      isLoading: false,
      error: "",
    });

    render(<Details />);

    const panel = screen.getByTestId("details");
    expect(panel).toBeInTheDocument();

    const button = await within(panel).findByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(useRouter().push).toHaveBeenCalled();
    expect(useRouter().push).toHaveBeenCalledWith({ pathname: "/", query: { limit: "30", page: "1" } });
  });

  test("should show loader when data is loading", async () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue({
      pokemonDetails: {},
      isLoading: true,
      error: "",
    });

    render(<Details />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const pokemonName = screen.queryByText(/pikachu/i);
    expect(pokemonName).not.toBeInTheDocument();
  });

  test("should show error message if failed to fetch data", async () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue({
      pokemonDetails: {},
      isLoading: false,
      error: "Error",
    });

    render(<Details />);

    const error = screen.getByText(/Something wrong/i);
    const pokemonName = screen.queryByText(/pikachu/i);

    expect(error).toBeInTheDocument();
    expect(pokemonName).not.toBeInTheDocument();
  });
});
