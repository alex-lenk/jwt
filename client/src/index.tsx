import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider, rootStores } from './store';
import ErrorBoundary from './ErrorBoundary';
import App from './App';
import './styles/app.scss';

const root = createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider value={ rootStores }>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
