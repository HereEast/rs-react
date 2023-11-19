import "@testing-library/jest-dom";

import { getMaxPage } from "../utils";
import { BASE_URL } from "../constants";

const mockLimitParams = new URLSearchParams("limit=10");
const mockData = { count: 50 };

describe("getMaxPage function", () => {
  it("should return the correct maximum page", async () => {
    globalThis.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: async () => mockData,
        }) as Promise<Response>,
    );

    const maxPage = await getMaxPage(mockLimitParams);
    expect(maxPage).toBe("5");

    expect(globalThis.fetch).toHaveBeenCalledWith(BASE_URL);
  });
});
