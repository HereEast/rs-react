import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { App } from "./components/App";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
