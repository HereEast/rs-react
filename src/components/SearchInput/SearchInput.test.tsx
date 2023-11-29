import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import * as actions from "../../store/search/slice";
import user from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { SearchInput } from "./index";

jest.mock("react-redux");

const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch") as jest.Mock;
const mockedSaveString = jest.spyOn(actions, "saveSearchString") as jest.Mock;

jest.spyOn(reduxHooks, "useSelector").mockReturnValue({ isLoading: false });

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
    query: { limit: "30", page: "1" },
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

const mockSetItem = jest.spyOn(Storage.prototype, "setItem");
const mockGetItem = jest.spyOn(Storage.prototype, "getItem");

describe("SearchInput component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("should call dispatch when there is no input value", async () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    render(<SearchInput />);

    const inputElement: HTMLInputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalled();
    });
  });

  test("should call dispatch with inputValue when there is input value", async () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    render(<SearchInput />);

    const inputElement: HTMLInputElement = screen.getByRole("textbox");
    await user.type(inputElement, "pikachu");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    expect(dispatch).toHaveBeenCalled();
    expect(mockedSaveString).toHaveBeenCalledWith({ inputValue: "pikachu" });
  });

  test("should render an input and a button", () => {
    render(<SearchInput />);

    const inputElement = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /search/i });

    expect(inputElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test("should save entered value to local storage on button click", async () => {
    render(<SearchInput />);

    //
    const inputElement: HTMLInputElement = screen.getByRole("textbox");
    await user.type(inputElement, "pikachu");

    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith("searchString", "pikachu");
  });

  test("should get value from the local storage upon mounting", async () => {
    localStorage.setItem("searchString", "pikachu");

    render(<SearchInput />);

    expect(mockGetItem).toHaveBeenCalled();
    expect(mockGetItem).toHaveBeenCalledWith("searchString");

    const inputElement: HTMLInputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("pikachu");
  });

  test("should render empty input with placeholder if searchString is empty", async () => {
    localStorage.setItem("searchString", "");

    render(<SearchInput />);

    const inputElement: HTMLInputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("");
    expect(inputElement.placeholder).toBe("Search Pokemon");
  });
});
