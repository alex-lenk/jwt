import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from "./store/";

interface State {
  store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
  store,
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <App/>
    </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
