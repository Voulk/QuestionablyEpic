import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker, { unregister } from "./registerServiceWorker";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Redux/Reducers/RootReducer";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


const store = createStore(rootReducer, /* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

Sentry.init({
  dsn: "https://2b2f81e5ca1e4c9a9dfa1f5c858361e4@o919279.ingest.sentry.io/5863333",
  integrations: [new Integrations.BrowserTracing()],
  release: "qe-live@9.30",
  denyUrls: "localhost",
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.1,
});

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,

  document.getElementById("root"),
);
unregister();
//registerServiceWorker();
