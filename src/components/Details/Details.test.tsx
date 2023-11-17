import "@testing-library/jest-dom";

import user from "@testing-library/user-event";
import { render, screen, within, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Details } from "./index";
import { mockPokemonData } from "../../__mocks__/pokemonData";
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
const getPokemonMock = jest.fn();

describe("Details component", () => {
  test("should correctly display the detailed card data", async () => {
    getPokemonMock.mockResolvedValue([mockPokemonData]);
    useFetchPokemonMock.mockReturnValue({
      getPokemon: getPokemonMock,
      getAllPokemon: jest.fn(),
      isLoading: false,
      error: "",
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getPokemonMock).toHaveBeenCalled();
    });

    const panel = screen.getByTestId("details");
    expect(panel).toBeInTheDocument();

    const heading = await within(panel).findByRole("heading", { name: /pikachu/i });
    expect(heading).toBeInTheDocument();

    screen.debug();
  });

  test("should hide component clicking on Close button", async () => {
    getPokemonMock.mockResolvedValue([mockPokemonData]);
    useFetchPokemonMock.mockReturnValue({
      getPokemon: getPokemonMock,
      getAllPokemon: jest.fn(),
      isLoading: false,
      error: "",
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getPokemonMock).toHaveBeenCalled();
    });

    const panel = screen.getByTestId("details");
    expect(panel).toBeInTheDocument();

    const button = await within(panel).findByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(mockSetSelectedItem).toHaveBeenCalledWith(null);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/?limit=30&page=1");
  });

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
});

// import "@testing-library/jest-dom";

// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { Details } from "./index";
// import { useFetchPokemon } from "../../hooks";

// interface IUseFetchPokemon {
//   getPokemon: jest.Mock;
//   getAllPokemon: jest.Mock;
//   isLoading: boolean;
//   error: string;
// }

// interface IContext {
//   selectedItem: string;
// }

// jest.mock("../../hooks/useAppContext", () => ({
//   useAppContext: (): IContext => ({
//     selectedItem: "Pokemon",
//   }),
// }));

// jest.mock("../../hooks/useFetchPokemon");

// describe("Details component", () => {
//   test("should show Loader when data is fetching", async () => {
//     (useFetchPokemon as jest.Mock<IUseFetchPokemon>).mockReturnValue({
//       getPokemon: jest.fn(),
//       getAllPokemon: jest.fn(),
//       isLoading: true,
//       error: "",
//     });

//     render(
//       <MemoryRouter>
//         <Details />
//       </MemoryRouter>,
//     );

//     expect(useFetchPokemon).toHaveBeenCalledTimes(1);

//     const loader = screen.getByText(/loading/i);
//     expect(loader).toBeInTheDocument();
//   });
// });
