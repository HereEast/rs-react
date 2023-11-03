import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Main } from "../components/Main";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Main />} />
    </Route>,
  ),
);
