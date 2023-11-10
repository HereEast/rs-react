import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../../router";
import { ErrorBoundary } from "../ErrorBoundary";
import { DetailsProvider } from "../../context";

function App(): ReactElement {
  return (
    <ErrorBoundary>
      <DetailsProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DetailsProvider>
    </ErrorBoundary>
  );
}

export default App;
