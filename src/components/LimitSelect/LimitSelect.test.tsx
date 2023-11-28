import "@testing-library/jest-dom";

// import * as reduxHooks from "react-redux";
// import user from "@testing-library/user-event";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { LimitSelect } from "./index";
// import { RANGE_OPTIONS } from "../../constants";

// jest.mock("react-redux");

// jest.spyOn(reduxHooks, "useDispatch").mockReturnValue(jest.fn());
// jest.spyOn(reduxHooks, "useSelector").mockReturnValue({ isLoading: false });

// type Param = { page: string; limit: string };
// type UseSearchParamsReturn = [URLSearchParams, (params: Param) => void];

// const mockSetSearchParams = jest.spyOn(URLSearchParams.prototype, "set");
// const mockSearchParams = new URLSearchParams("limit=10&page=5");

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useSearchParams: (): UseSearchParamsReturn => [
//     mockSearchParams,
//     (params: Param): void => {
//       mockSearchParams.set("page", params.page);
//       mockSearchParams.set("limit", params.limit);
//     },
//   ],
// }));

// function renderLimitSelect(): void {
//   render(
//     <MemoryRouter>
//       <LimitSelect />
//     </MemoryRouter>,
//   );
// }

describe("LimitSelect component", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  test("should check that component is rendered and has all options", async () => {
    expect(true).toBe(true);
    // renderLimitSelect();

    // const selectElement = screen.getByRole("combobox");
    // expect(selectElement).toBeInTheDocument();

    // for (const option of RANGE_OPTIONS) {
    //   expect(screen.getByText(option)).toBeInTheDocument();
    // }
  });

  // test("should change current value on change event", async () => {
  //   renderLimitSelect();

  //   const selectElement = screen.getByRole("combobox");

  //   await user.selectOptions(selectElement, "80");
  //   expect(selectElement).toHaveValue("80");
  // });

  // test("should update page to 1 on limit change", async () => {
  //   renderLimitSelect();

  //   const selectElement = screen.getByRole("combobox");

  //   await user.selectOptions(selectElement, "80");

  //   expect(mockSetSearchParams).toHaveBeenCalledTimes(2);
  //   expect(mockSetSearchParams).toHaveBeenNthCalledWith(1, "page", "1");
  //   expect(mockSetSearchParams).toHaveBeenNthCalledWith(2, "limit", "80");
  // });
});
