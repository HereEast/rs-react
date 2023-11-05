import { Route, Routes } from "react-router-dom";
import { Main } from "../components/Main";
import { ReactElement } from "react";

function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default Router;
