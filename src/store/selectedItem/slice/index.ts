import { createSlice } from "@reduxjs/toolkit";

export const initialSelectedItem = {
  selectedItem: "",
};

export const selectedItemSlice = createSlice({
  name: "selectedItem",
  initialState: initialSelectedItem,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
