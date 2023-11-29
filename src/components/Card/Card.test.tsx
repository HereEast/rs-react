import "@testing-library/jest-dom";

import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { Card } from "./index";

const mockUseDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: (): jest.Mock => mockUseDispatch,
}));

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
    query: { limit: "30", page: "1" },
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

describe("Card component", () => {
  test("should render the relevant card data when there is no image src", () => {
    render(<Card name="pikachu" image={null} />);

    const card = screen.getByTestId("card");
    const cardImage = screen.queryByRole("img", { name: /pikachu/i });

    expect(card).toBeInTheDocument();
    expect(cardImage).not.toBeInTheDocument();
  });

  test("should render the relevant card data", () => {
    render(<Card name="pikachu" image="pikachu.png" />);

    const card = screen.getByTestId("card");
    const cardTitle = screen.getByRole("heading", { name: /pikachu/i });
    const cardImage = screen.getByRole("img", { name: /pikachu/i });

    expect(card).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute("src", "pikachu.png");
  });

  test("should open detailed card component by clicking on a card", async () => {
    render(<Card name="pikachu" image="pikachu.png" />);

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();

    await user.click(card);

    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith({
      pathname: "/",
      query: { details: "pikachu", limit: "30", page: "1" },
    });
  });
});
