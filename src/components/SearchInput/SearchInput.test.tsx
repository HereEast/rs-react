import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import { SearchInput } from "./index";

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: jest.fn(() => ({
    searchString: "",
    setSearchString: jest.fn(),
  })),
}));

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
  },
});

describe("SearchInput component", () => {
  test("should save entered value to local storage on button click", async () => {
    const handleSearchMock = jest.fn();

    render(
      <MemoryRouter>
        <SearchInput handleSearch={handleSearchMock} isLoading={false} />
      </MemoryRouter>,
    );

    const inputElement = screen.getByPlaceholderText("Search Pokemon");

    user.click(inputElement);
    user.keyboard("pikachu");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    expect(mockSetItem).toHaveBeenCalled();

    waitFor(() => {
      expect(localStorage.getItem("searchString")).toEqual("pikachu");
    });
  });

  test("retrieves value from local storage upon mounting", async () => {
    const handleSearchMock = jest.fn();

    localStorage.setItem("searchString", "pikachu");

    render(
      <MemoryRouter>
        <SearchInput handleSearch={handleSearchMock} isLoading={false} />
      </MemoryRouter>,
    );

    expect(mockGetItem).toHaveBeenCalled();
    expect(mockGetItem).toHaveBeenCalledWith("searchString");

    waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
    });
  });
});
