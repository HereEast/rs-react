import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../../router";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
