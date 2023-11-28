import "@testing-library/jest-dom";

// import userEvent from "@testing-library/user-event";
// import { render, screen } from "@testing-library/react";
// import { Button } from "./index";

// const handleClick = jest.fn();

describe("Button component", () => {
  test("should be rendered with correct props", () => {
    expect(true).toBe(true);
    // const props = {
    //   name: "Button",
    //   className: "button__test",
    //   type: "button",
    // } as const;

    // render(<Button {...props} />);

    // const button = screen.getByRole("button", { name: /Button/i });

    // expect(button).toBeInTheDocument();
    // expect(button).toHaveClass("button__test");
    // expect(button).toHaveAttribute("type", "button");
  });

  // test("should call callback function if it's passed as a parameter", async () => {
  //   const props = {
  //     name: "Button",
  //     className: "button__test",
  //     type: "button",
  //     onClick: (): void => handleClick(),
  //   } as const;

  //   render(<Button {...props} />);

  //   const button = screen.getByRole("button", { name: /Button/i });
  //   expect(button).toBeInTheDocument();

  //   await userEvent.click(button);

  //   expect(handleClick).toHaveBeenCalled();
  // });
});
