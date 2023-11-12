import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Card } from "./index";

interface ISearchResults {
  searchResults: { name: string; image: string }[];
}

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: (): ISearchResults => ({
    searchResults: [{ name: "Pokemon", image: "pokemon.jpg" }],
  }),
}));

describe("Card component", () => {
  test("should render the relevant card data", () => {
    render(
      <MemoryRouter>
        <Card name="Pokemon" image="pokemon.jpg" />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("card");
    const cardTitle = screen.getByRole("heading", { name: /Pokemon/i });
    const cardImage = screen.getByRole("img", { name: /Pokemon/i });

    expect(card).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute("src", "pokemon.jpg");
  });
});
