import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../../router";
import { Provider } from "react-redux";
import { store } from "../../store/store";

function App(): ReactElement {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
