import selectedItemReducer, { initialSelectedItem, setSelectedItem } from "../../store/selectedItem/slice";

describe("Redux searchStringSlice slice: ", () => {
  test("should return default state when passed an empty action", () => {
    const result = selectedItemReducer(undefined, { type: "" });
    expect(result).toStrictEqual({ selectedItem: "" });
  });

  test("should save search string with 'saveSearchString' action", () => {
    const action = { type: setSelectedItem.type, payload: "pikachu" };
    const result = selectedItemReducer(initialSelectedItem, action);

    expect(result.selectedItem).toBe("pikachu");
  });
});
