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

const initialState = {
  gameType: "Retail",
  contentType: "Raid",
};

function reducer(state = initialState, action) {
  console.log('reducer', state, action);

  switch (action.type) {
    case TOGGLE_CONTENT: {
      const { content } = action.payload;
      const toggleType = content === "Raid" ? "Dungeon" : "Raid";
      return {
        ...state,
        contentType: toggleType,
      };
    }
    default:
  return state;
}
}

const store = createStore(reducer);

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
