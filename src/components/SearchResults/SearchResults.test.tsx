import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import { render, screen } from "@testing-library/react";
import { SearchResults } from "./index";
import { NextRouter } from "next/router";

const cardsMock = [
  { name: "Card 1", image: "card1.jpg" },
  { name: "Card 2", image: "card2.jpg" },
  { name: "Card 3", image: "" },
];

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: (): Partial<NextRouter> => ({
    query: {},
  }),
}));

jest.mock("react-redux");
jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());

const useSelectorMock = jest.spyOn(reduxHooks, "useSelector");

describe("SearchResults component", () => {
  test("should render the specified number of cards", () => {
    useSelectorMock.mockReturnValue({
      searchResults: cardsMock,
      isLoading: false,
      error: "",
    });

    render(<SearchResults />);

    const cards = screen.getAllByText(/card/i);
    expect(cards.length).toEqual(3);
  });

  test("should not render any cards when searchResults array is empty", () => {
    useSelectorMock.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: "",
    });

    render(<SearchResults />);

    const cards = screen.queryAllByText(/card/i);
    expect(cards.length).toEqual(0);
  });

  test("should render proper data on cards", async () => {
    useSelectorMock.mockReturnValue({
      searchResults: cardsMock,
      isLoading: false,
      error: "",
    });

    render(<SearchResults />);

    const card1 = screen.getByText(/card 1/i);
    const card2 = screen.getByText(/card 2/i);

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });

  test("should render image properly when src in not available", async () => {
    useSelectorMock.mockReturnValue({
      searchResults: cardsMock,
      isLoading: false,
      error: "",
    });

    render(<SearchResults />);

    const image3 = screen.getByRole("img", { name: "Image is not available." });

    expect(image3).toBeInTheDocument();
    expect(image3).toHaveAttribute("src", "");
  });

  test("should render an appropriate message if no cards are present", () => {
    useSelectorMock.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: "Error message.",
    });

    render(<SearchResults />);

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

    render(<SearchResults />);

    const loading = screen.queryByText("Loading...");
    expect(loading).toBeInTheDocument();
  });
});
