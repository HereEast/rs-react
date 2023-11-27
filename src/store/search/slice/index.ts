import { createSlice } from "@reduxjs/toolkit";

export const initialSearchString = {
  searchString: "",
};

export const searchStringSlice = createSlice({
  name: "searchString",
  initialState: initialSearchString,
  reducers: {
    saveSearchString(state, action) {
      state.searchString = action.payload;
    },
  },
});

export const { saveSearchString } = searchStringSlice.actions;
export default searchStringSlice.reducer;
