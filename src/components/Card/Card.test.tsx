import "@testing-library/jest-dom";

import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Card } from "./index";

const mockSetSelectedItem = jest.fn();
const mockedUsedNavigate = jest.fn();

interface IContext {
  searchResults: { name: string; image: string }[];
  setSelectedItem: jest.Mock;
}

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: (): IContext => ({
    searchResults: [{ name: "pikachu", image: "pikachu.jpg" }],
    setSelectedItem: mockSetSelectedItem,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: (): jest.Mock => mockedUsedNavigate,
}));

function renderCard(): void {
  render(
    <MemoryRouter>
      <Card name="pikachu" image="pikachu.jpg" />
    </MemoryRouter>,
  );
}

describe("Card component", () => {
  test("should render the relevant card data", () => {
    renderCard();

    const card = screen.getByTestId("card");
    const cardTitle = screen.getByRole("heading", { name: /pikachu/i });
    const cardImage = screen.getByRole("img", { name: /pikachu/i });

    expect(card).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute("src", "pikachu.jpg");
  });

  test("should open detailed card component by clicking on a card", async () => {
    renderCard();

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();

    await user.click(card);

    expect(mockSetSelectedItem).toHaveBeenCalledWith("pikachu");
    expect(mockedUsedNavigate).toHaveBeenCalledWith("details-pikachu?limit=30&page=1");
  });
});
