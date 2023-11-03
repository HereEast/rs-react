import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../../router/Router";

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
