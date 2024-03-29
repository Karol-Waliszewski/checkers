import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "store";

import App from "App";

import GlobalStyles from "styles/global";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>
);
