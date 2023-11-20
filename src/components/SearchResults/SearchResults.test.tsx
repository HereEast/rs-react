import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchResults } from "./index";
import { AppContextProvider } from "../../context";

const cardsMock = [
  { name: "Card 1", image: "card1.jpg" },
  { name: "Card 2", image: "card2.jpg" },
];

jest.mock("react-redux");
jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());

const useSelectorMock = jest.spyOn(reduxHooks, "useSelector");

function renderComponent(): void {
  render(
    <AppContextProvider>
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    </AppContextProvider>,
  );
}

describe("SearchResults component", () => {
  test("should render the specified number of cards", () => {
    useSelectorMock.mockReturnValue({
      searchResults: cardsMock,
      isLoading: false,
      error: "",
    });

    renderComponent();

    const cards = screen.getAllByText(/card/i);
    expect(cards.length).toEqual(2);
  });

  test("should render proper data on cards", async () => {
    useSelectorMock.mockReturnValue({
      searchResults: cardsMock,
      isLoading: false,
      error: "",
    });

    renderComponent();

    const card1 = screen.getByText(/card 1/i);
    const card2 = screen.getByText(/card 2/i);

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });

  test("should render an appropriate message if no cards are present", () => {
    useSelectorMock.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: "Error message.",
    });

    renderComponent();

    const card1 = screen.queryByText("Non-existent Card 1");
    const card2 = screen.queryByText("Non-existent Card 2");

    expect(card1).not.toBeInTheDocument();
    expect(card2).not.toBeInTheDocument();

    const errorMessage = screen.queryByText("Error message.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("should render loader if isLoading is true", () => {
    useSelectorMock.mockReturnValue({
      searchResults: cardsMock,
      isLoading: true,
      error: "",
    });

    renderComponent();

    const loading = screen.queryByText("Loading...");
    expect(loading).toBeInTheDocument();
  });
});
