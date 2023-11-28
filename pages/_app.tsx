import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { AppContextProvider } from "../src/context";
import { Provider } from "react-redux";
import { store } from "../src/store/store";

import "../src/styles/global.scss";

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AppContextProvider>
  );
}

export default App;
