import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Pagination } from "./index";

jest.mock("react-redux");

jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());
jest.spyOn(reduxHooks, "useSelector").mockReturnValue({ isLoading: false });

type Param = { page: string };
type UseSearchParamsReturn = [URLSearchParams, (params: Param) => void];

const mockSetSearchParams = jest.spyOn(URLSearchParams.prototype, "set");
const mockSearchParams = new URLSearchParams("page=5");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: (): UseSearchParamsReturn => [
    mockSearchParams,
    (params: Param): void => {
      mockSearchParams.set("page", params.page);
    },
  ],
}));

jest.mock("../../utils/getMaxPage", () => ({
  getMaxPage: jest.fn(async () => "10"),
}));

function renderPagination(): void {
  render(
    <MemoryRouter>
      <Pagination />
    </MemoryRouter>,
  );
}

describe("Pagination component", () => {
  beforeEach(() => {
    mockSearchParams.set("page", "5");
  });

  test("should update page parameters in URL on click on buttons", async () => {
    renderPagination();

    const buttonNext = screen.getByRole("button", { name: /next/i });
    expect(buttonNext).toBeInTheDocument();

    expect(mockSearchParams.get("page")).toBe("5");

    await user.click(buttonNext);

    expect(mockSetSearchParams).toHaveBeenCalled();
    expect(mockSetSearchParams).toHaveBeenCalledWith("page", "6");

    expect(mockSearchParams.get("page")).toBe("6");
  });

  test("should update page parameters in URL on click on button Prev", async () => {
    renderPagination();

    const buttonPrev = screen.getByRole("button", { name: /prev/i });
    expect(buttonPrev).toBeInTheDocument();

    expect(mockSearchParams.get("page")).toBe("5");

    await user.click(buttonPrev);

    expect(mockSetSearchParams).toHaveBeenCalled();
    expect(mockSetSearchParams).toHaveBeenCalledWith("page", "4");

    expect(mockSearchParams.get("page")).toBe("4");
  });
});
