import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker, { unregister } from "./registerServiceWorker";
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import i18n from "./i18n";
import { TOGGLE_CONTENT } from "./Redux/ActionTypes"
import rootReducer from "./Redux/Reducers/RootReducer"



const store = createStore(rootReducer);

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
