import React, { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import ErrorBoundary from './ErrorBoundary';
import App from './App';

interface State {
  store: typeof store;
}

export const Context = createContext<State>({
  store,
});

createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <StrictMode>
    <BrowserRouter>
      <Context.Provider value={ {store} }>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </Context.Provider>
    </BrowserRouter>
  </StrictMode>,
);
