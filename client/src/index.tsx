import React, {StrictMode, createContext} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import Store from './store/';
import './styles/app.scss';
import App from './App';

interface State {
  store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
  store,
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Context.Provider value={{store}}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Context.Provider>
  </StrictMode>,
);
