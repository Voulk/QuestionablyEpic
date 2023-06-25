import App from "./App";
import 'jest-canvas-mock';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createRoot } from 'react-dom/client';

import {render} from '@testing-library/react';

const middlewares = []
const mockStore = configureStore(middlewares)

it("renders without crashing", () => {
  const initialState = {output:10}
  const store = mockStore(initialState)
  render(<Provider store={store}><App /></Provider>);
});
