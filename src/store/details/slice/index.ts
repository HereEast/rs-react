import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: "",
  detailsOpen: false,
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItem = action.payload.selectedItem;
      state.detailsOpen = true;
    },
    removeSelectedItem(state) {
      state.selectedItem = "";
      state.detailsOpen = false;
    },
  },
});

export const { setSelectedItem, removeSelectedItem } = detailsSlice.actions;
export default detailsSlice.reducer;
