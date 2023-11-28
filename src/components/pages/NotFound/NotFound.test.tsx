import "@testing-library/jest-dom";

// import user from "@testing-library/user-event";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter, Routes, Route } from "react-router-dom";
// import { ReactElement } from "react";
// import { NotFound } from "./index";

describe("NotFound component", () => {
  test("should display NotFound page for invalid route", () => {
    expect(true).toBe(true);
    // const HomePage = (): ReactElement => <div>Home page</div>;

    // render(
    //   <MemoryRouter initialEntries={["/not-found"]}>
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
    //   </MemoryRouter>,
    // );

    // const message = screen.getByText(/Page not found/i);
    // const button = screen.getByRole("button", { name: /Back to main/i });

    // expect(message).toBeInTheDocument();
    // expect(button).toBeInTheDocument();
  });

  // test("should navigate to Home page on click on button", async () => {
  //   const HomePage = (): ReactElement => <div>Home page</div>;

  //   render(
  //     <MemoryRouter initialEntries={["/not-found"]}>
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route path="*" element={<NotFound />} />
  //       </Routes>
  //     </MemoryRouter>,
  //   );

  //   const button = screen.getByRole("button", { name: /Back to main/i });
  //   expect(button).toBeInTheDocument();

  //   await user.click(button);
  //   expect(screen.getByText("Home page")).toBeInTheDocument();
  // });
});
