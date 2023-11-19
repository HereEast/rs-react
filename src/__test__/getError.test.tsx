import "@testing-library/jest-dom";

import { getError } from "../utils";

describe("Function getError", () => {
  test("should return error message when error is an instance of Error", () => {
    const error = new Error("Test error");
    const result = getError(error);
    expect(result).toBe(error.message);
  });

  test("should return 'Something was wrong' when error is not an instance of Error", () => {
    const result = getError("Error not instance.");
    expect(result).toBe("Something went wrong.");
  });
});
