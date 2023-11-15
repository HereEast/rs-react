import { createSlice } from "@reduxjs/toolkit";

export const searchStringSlice = createSlice({
  name: "searchString",
  initialState: {
    searchString: "",
  },
  reducers: {
    saveSearchString(state, action) {
      state.searchString = action.payload.inputValue;
    },
  },
});

export const { saveSearchString } = searchStringSlice.actions;
export default searchStringSlice.reducer;
