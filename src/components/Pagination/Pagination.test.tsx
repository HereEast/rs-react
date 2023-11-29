import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { Pagination } from "./index";

jest.mock("react-redux");

jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());
jest.spyOn(reduxHooks, "useSelector").mockReturnValue({ isLoading: false });

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
    query: { limit: "30", page: "5" },
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

jest.mock("../../utils/getMaxPage", () => ({
  getMaxPage: jest.fn(async () => "10"),
}));

describe("Pagination component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should update page parameters in URL on click on buttons", async () => {
    render(<Pagination />);

    const buttonNext = screen.getByRole("button", { name: /next/i });
    expect(buttonNext).toBeInTheDocument();

    await user.click(buttonNext);

    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith({ pathname: "/", query: { limit: "30", page: 6 } });
  });

  test("should update page parameters in URL on click on button Prev", async () => {
    render(<Pagination />);

    const buttonPrev = screen.getByRole("button", { name: /prev/i });
    expect(buttonPrev).toBeInTheDocument();

    await user.click(buttonPrev);

    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith({ pathname: "/", query: { limit: "30", page: 4 } });
  });
});
