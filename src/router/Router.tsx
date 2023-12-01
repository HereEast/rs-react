import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { UncontrolledForm } from "../components/UncontrolledForm";
import { ReactHookForm } from "../components/ReactHookForm";
import { NotFound } from "../pages/NotFound";

function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="react-hook-form" element={<ReactHookForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
