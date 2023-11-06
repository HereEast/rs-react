import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../../router";
import { ErrorBoundary } from "../ErrorBoundary";

function App(): ReactElement {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
