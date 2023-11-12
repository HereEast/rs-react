import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchResults } from "./index";

interface ISearchResults {
  searchResults: { name: string; image: string }[];
}

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: (): ISearchResults => ({
    searchResults: [
      { name: "Card 1", image: "card1.jpg" },
      { name: "Card 2", image: "card2.jpg" },
    ],
  }),
}));

describe("SearchResults component", () => {
  test("should render the specified number of cards", () => {
    render(
      <MemoryRouter>
        <SearchResults isLoading={false} error={""} />
      </MemoryRouter>,
    );

    const card1 = screen.getByText("Card 1");
    const card2 = screen.getByText("Card 2");

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();

    const errorMessage = screen.queryByText("Error message.");
    const loading = screen.queryByText("Loading...");

    expect(errorMessage).not.toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
  });

  test("should render an appropriate message if no cards are present", () => {
    render(
      <MemoryRouter>
        <SearchResults isLoading={false} error={"Error message."} />
      </MemoryRouter>,
    );

    const card1 = screen.queryByText("Non-existent Card 1");
    const card2 = screen.queryByText("Non-existent Card 2");

    expect(card1).not.toBeInTheDocument();
    expect(card2).not.toBeInTheDocument();

    const errorMessage = screen.queryByText("Error message.");

    expect(errorMessage).toBeInTheDocument();
  });
});
