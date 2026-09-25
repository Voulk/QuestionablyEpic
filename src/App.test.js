import App from "./App";
import 'jest-canvas-mock';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createRoot } from 'react-dom/client';

import {render} from '@testing-library/react';

const middlewares = []
const mockStore = configureStore(middlewares)

// Worker construction uses import.meta.url, which only the webpack build can parse. Stub the factory so importing
// App doesn't drag it in. The rest of TopGearEngineShared is plain functions and loads fine.
jest.mock('General/Modules/TopGear/Engine/TopGearWorkerFactory', () => {
  return {
    createTopGearWorker: jest.fn(),
  };
});

it("renders without crashing", () => {
  const initialState = { output: 10 };
  const store = mockStore(initialState);

  const div = document.createElement("div");
  document.body.appendChild(div);

  const root = createRoot(div);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
