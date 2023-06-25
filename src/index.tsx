import "./index.css";
import App from "./App";
import registerServiceWorker, { unregister } from "./registerServiceWorker";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createRoot } from 'react-dom/client';
import rootReducer from "./Redux/Reducers/RootReducer";
import { composeWithDevTools } from '@redux-devtools/extension';


const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools());


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const render = () => {
  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
  </Provider>,
  );
};

render();

/*
ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root"),
); */
unregister();
//registerServiceWorker();
