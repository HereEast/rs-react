import { createSlice } from "@reduxjs/toolkit";

export const limitSlice = createSlice({
  name: "limit",
  initialState: {
    limit: "30",
  },
  reducers: {
    saveLimit(state, action) {
      state.limit = action.payload;
    },
  },
});

export const { saveLimit } = limitSlice.actions;
export default limitSlice.reducer;
