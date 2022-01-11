import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'jest-canvas-mock';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

it("renders without crashing", () => {
  const initialState = {output:10}
  //const mockStore = configureStore()

  const store = mockStore(initialState)

  const div = document.createElement("div");

  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  //ReactDOM.render(<App />, div);
});
