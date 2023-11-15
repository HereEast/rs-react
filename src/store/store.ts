import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import searchStringReducer from "./search/slice";
import limitReducer from "./limit/slice";
import detailsReducer from "./mode/slice";

export const store = configureStore({
  reducer: {
    searchString: searchStringReducer,
    limit: limitReducer,
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
