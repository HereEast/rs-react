import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../../router";
import { ErrorBoundary } from "../ErrorBoundary";
import { AppContextProvider } from "../../context";

function App(): ReactElement {
  return (
    <ErrorBoundary>
      <AppContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;
