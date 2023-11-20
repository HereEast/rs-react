import searchStringReducer, { saveSearchString, initialSearchString } from "../../store/search/slice";

describe("Redux searchStringSlice slice: ", () => {
  test("should return default state when passed an empty action", () => {
    const result = searchStringReducer(undefined, { type: "" });
    expect(result).toStrictEqual({ searchString: "" });
  });

  test("should save search string with 'saveSearchString' action", () => {
    const action = { type: saveSearchString.type, payload: "pikachu" };
    const result = searchStringReducer(initialSearchString, action);

    expect(result.searchString).toBe("pikachu");
  });
});
