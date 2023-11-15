import { createSlice } from "@reduxjs/toolkit";

export const limitSlice = createSlice({
  name: "limit",
  initialState: {
    limit: "30",
  },
  reducers: {
    changeLimit(state, action) {
      state.limit = action.payload.limit;
    },
  },
});

export const { changeLimit } = limitSlice.actions;
export default limitSlice.reducer;
