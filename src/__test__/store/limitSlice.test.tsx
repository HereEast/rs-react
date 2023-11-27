import limitReducer, { saveLimit, initialLimit } from "../../store/limit/slice";

describe("Redux limitSlice slice: ", () => {
  test("should return default state when passed an empty action", () => {
    const result = limitReducer(undefined, { type: "30" });
    expect(result).toStrictEqual(initialLimit);
  });

  test("should save search string with 'saveSearchString' action", () => {
    const action = { type: saveLimit.type, payload: "20" };
    const result = limitReducer(initialLimit, action);

    expect(result.limit).toBe("20");
  });
});
