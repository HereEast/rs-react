import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Details } from "../components/Details";
import { NotFound } from "../pages/NotFound";

function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":details" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
