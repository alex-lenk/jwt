import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {StoreProvider, rootStores} from './store';
import ErrorBoundary from './ErrorBoundary';
import App from './App';

createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider value={rootStores}>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
