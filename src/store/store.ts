import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { pokemonReducer } from "./pokemon/slice";
import { pokemonDetailsReducer } from "./pokemonDetails/slice";

import searchStringReducer from "./search/slice";
import limitReducer from "./limit/slice";
import selectedItemReducer from "./selectedItem/slice";

// import { Store, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
// import { createWrapper, HYDRATE } from "next-redux-wrapper";

// const rootReducer = {
//   searchString: searchStringReducer,
//   limit: limitReducer,
//   pokemon: pokemonReducer,
//   pokemonDetails: pokemonDetailsReducer,
// };

// const reducer = (state: any, action: any) => {
//   if (action.type === HYDRATE) {
//     return {
//       ...state,
//       ...action.payload,
//     };
//   }
//   return rootReducer;
// };

// const store = (): Store =>
//   configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
//   });

// export const storeWrapper = createWrapper(store);

// export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

// Changed, added 2 lines, commented 1
// export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
// export const useAppDispatch: () => AppThunkDispatch = useDispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const wrapper = createWrapper<AppStore>(store, { debug: true });

export const store = configureStore({
  reducer: {
    searchString: searchStringReducer,
    limit: limitReducer,
    selectedItem: selectedItemReducer,
    pokemon: pokemonReducer,
    pokemonDetails: pokemonDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
