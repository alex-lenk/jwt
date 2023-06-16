import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import Store from './store';
import { Provider } from 'mobx-react';

render(
  <StrictMode>
    <Provider store={ Store }>
      <App/>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
