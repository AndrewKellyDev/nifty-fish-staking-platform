import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from 'buffer';
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "./constants/misc";

import getLibrary from "./utils/getLibrary";
window.Buffer = window.Buffer || Buffer;

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <App />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>
);
