import { ReactElement, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../../router";
import { ErrorBoundary } from "../ErrorBoundary";
import { DetailsContext } from "../../context";

function App(): ReactElement {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <ErrorBoundary>
      <DetailsContext.Provider value={{ selectedItem, setSelectedItem }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DetailsContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
