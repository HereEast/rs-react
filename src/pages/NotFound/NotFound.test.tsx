import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./index";

describe("NotFound page component", () => {
  test("should render a message and a button", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const message = screen.getByText(/Page not found/i);
    const button = screen.getByRole("button", { name: /Back to main/i });

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("displays NotFound page for invalid route", () => {
    render(
      <MemoryRouter initialEntries={["/not-found"]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );

    const message = screen.getByText(/Page not found/i);
    expect(message).toBeInTheDocument();
  });
});
