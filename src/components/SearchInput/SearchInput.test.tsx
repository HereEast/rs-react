import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchInput } from "./index";
import { AppContext } from "../../context";

jest.mock("react-redux");

const mockSetItem = jest.spyOn(Storage.prototype, "setItem");
const mockGetItem = jest.spyOn(Storage.prototype, "getItem");

jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());
jest.spyOn(reduxHooks, "useSelector").mockReturnValue({ isLoading: false });

function renderSearchInput(): void {
  const context = {
    selectedItem: "",
    setSelectedItem: jest.fn(),
    searchResults: [],
    setSearchResults: jest.fn(),
  };

  render(
    <AppContext.Provider value={context}>
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    </AppContext.Provider>,
  );
}

describe("SearchInput component", () => {
  beforeEach(() => {
    mockSetItem.mockClear();
    mockGetItem.mockClear();
    localStorage.clear();
  });

  test("should render an input and a button", () => {
    renderSearchInput();

    const inputElement = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /search/i });

    expect(inputElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test("should save entered value to local storage on button click", async () => {
    renderSearchInput();

    const inputElement: HTMLInputElement = screen.getByRole("textbox");
    await user.type(inputElement, "pikachu");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith("searchString", "pikachu");
  });

  test("should get value from the local storage upon mounting", async () => {
    localStorage.setItem("searchString", "pikachu");

    renderSearchInput();

    expect(mockGetItem).toHaveBeenCalled();
    expect(mockGetItem).toHaveBeenCalledWith("searchString");

    const inputElement: HTMLInputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("pikachu");
  });

  test("should render empty input with placeholder if searchString is empty", async () => {
    localStorage.setItem("searchString", "");

    renderSearchInput();

    const inputElement: HTMLInputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("");
    expect(inputElement.placeholder).toBe("Search Pokemon");
  });
});
