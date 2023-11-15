import { createSlice } from "@reduxjs/toolkit";

export const searchStringSlice = createSlice({
  name: "searchString",
  initialState: {
    searchString: "",
  },
  reducers: {
    setSearchString(state, action) {
      state.searchString = action.payload.inputValue;
    },
  },
});

export const { setSearchString } = searchStringSlice.actions;
export default searchStringSlice.reducer;
