import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "./index";

describe("NotFound page component", () => {
  test("should render a message and a button", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const message = screen.getByText("Page not found (404)");
    const button = screen.getByRole("button", { name: "Back to main" });

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
