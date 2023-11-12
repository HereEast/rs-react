import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Pagination } from "./index";

jest.mock("../../utils/getMaxPage", () => ({
  getMaxPage: jest.fn(async () => "10"),
}));

describe("Pagination component", () => {
  test("should update page parameters in URL", async () => {
    render(
      <MemoryRouter initialEntries={["?page=1"]}>
        <Pagination isLoading={false} />
      </MemoryRouter>,
    );

    const buttonNext = screen.getByRole("button", { name: /next/i });
    const label = screen.getByText(/Page/i);

    expect(buttonNext).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent(/1/i);

    await user.click(buttonNext);

    expect(label).toHaveTextContent(/2/i);
  });
});
