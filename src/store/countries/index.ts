import { createSlice } from "@reduxjs/toolkit";
import { COUNTRIES } from "../../utils";

export const initialCountries = COUNTRIES;

export const countriesSlice = createSlice({
  name: "countries",
  initialState: initialCountries,
  reducers: {},
});

export default countriesSlice.reducer;
