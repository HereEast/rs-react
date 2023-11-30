import { getSearchParam } from "../utils";
import { LIMIT, MIN_PAGE } from "../constants";

describe("getSearchParam function", () => {
  test("should return correct page when key is 'page'", () => {
    const searchParams = new URLSearchParams("page=5&limit=10");
    const result = getSearchParam(searchParams, "page");

    expect(result).toBe("5");
  });

  test("should return default page when key is 'page' and not present in URLSearchParams", () => {
    const searchParams = new URLSearchParams("limit=10");
    const result = getSearchParam(searchParams, "page");

    expect(result).toBe(MIN_PAGE.toString());
  });

  test("should return correct limit when key is 'limit'", () => {
    const searchParams = new URLSearchParams("page=5&limit=20");
    const result = getSearchParam(searchParams, "limit");

    expect(result).toBe("20");
  });

  test("should return default limit when key is 'limit' and not present in URLSearchParams", () => {
    const searchParams = new URLSearchParams("page=5");
    const result = getSearchParam(searchParams, "limit");

    expect(result).toBe(LIMIT.toString());
  });
});
