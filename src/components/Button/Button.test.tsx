import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { Button } from "./index";

describe("Button component", () => {
  test("should be rendered with correct props", () => {
    const props = {
      name: "Button",
      className: "button__test",
      type: "button",
    } as const;

    render(<Button {...props} />);

    const button = screen.getByRole("button", { name: /Button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button__test");
    expect(button).toHaveAttribute("type", "button");
  });
});
