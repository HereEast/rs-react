import { createSlice } from "@reduxjs/toolkit";
import { IFormData } from "../../types";

interface IInitialData {
  data: IFormData;
}

export const initialData: IInitialData = {
  data: {
    name: "",
    age: "",
    email: "",
    country: "",
    password: "",
    file: "",
    gender: "",
  },
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState: initialData,
  reducers: {
    saveFormData(state, action) {
      state.data = action.payload;
    },
    saveFileBase(state, action) {
      state.data.file = action.payload;
    },
  },
});

export const { saveFormData, saveFileBase } = formDataSlice.actions;
export default formDataSlice.reducer;
