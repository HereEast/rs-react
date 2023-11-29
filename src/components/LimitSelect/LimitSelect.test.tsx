import "@testing-library/jest-dom";

import * as reduxHooks from "react-redux";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { LimitSelect } from "./index";
import { RANGE_OPTIONS } from "../../constants";

jest.mock("react-redux");

jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());
jest.spyOn(reduxHooks, "useSelector").mockReturnValue({ isLoading: false });

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
    query: {},
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

describe("LimitSelect component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should check that component is rendered and has all options", async () => {
    render(<LimitSelect />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    for (const option of RANGE_OPTIONS) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });

  test("should change current value on change event", async () => {
    render(<LimitSelect />);

    const selectElement = screen.getByRole("combobox");

    await user.selectOptions(selectElement, "80");

    expect(selectElement).toHaveValue("80");
  });

  test("should update page to 1 and limit to selected limit on limit change", async () => {
    render(<LimitSelect />);

    const selectElement = screen.getByRole("combobox");

    await user.selectOptions(selectElement, "80");

    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith({ pathname: "/", query: { limit: "80", page: "1" } });
  });
});
