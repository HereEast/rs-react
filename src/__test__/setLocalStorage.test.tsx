import "@testing-library/jest-dom";

import { setLocalStorage, getLocalStorage } from "../utils";

describe("Function setLocalStorage", () => {
  test("should save key and value to localStorage", () => {
    setLocalStorage("key", "value");
    const storedValue = localStorage.getItem("key");
    expect(storedValue).toBe("value");
  });
});

describe("Function getLocalStorage", () => {
  it("should get a value from localStorage", () => {
    localStorage.setItem("key", "value");

    const value = getLocalStorage("key");
    expect(value).toBe("value");
  });

  it("should return an empty string if key is not found", () => {
    const value = getLocalStorage("nonExistentKey");
    expect(value).toBe("");
  });
});
