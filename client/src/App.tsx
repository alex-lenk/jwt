import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="container page__content">
      <HelmetProvider>
        <Routes>
          <Route path="/" element={ <LoginForm/> }/>
          <Route path="*" element={ <NotFound/> }/>
        </Routes>
      </HelmetProvider>

      <ToastContainer/>
    </div>
  );
}

/*
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { IUser } from './models/IUser';
import { useStores } from './store';
import { getFromStorage } from './helpers/storage';
const App: FC = observer(() => {
  const {networkStore} = useStores();

  useEffect(() => {
    if (getFromStorage('token')) {
      networkStore.checkAuth();
    }
  }, [networkStore]);

  if (networkStore.loginError) {
    toast.error(networkStore.loginError);
    return <div>Error:
      <ToastContainer/>
    </div>;
  }

  if (networkStore.isLoading) {
    return <div className="">Загрузка...</div>;
  }

  if (!networkStore.isAuth) {
    return (
      <div>
        <LoginForm/>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>
        { networkStore.isAuth
          ? `Пользователь авторизован ${ networkStore.user.email }`
          : 'АВТОРИЗУЙТЕСЬ!' }
      </h1>
      <h2>
        {
          networkStore.user.isActivated
            ? 'Аккаунт подтвержден по почте'
            : 'ПОТВЕРДИТЕ АККАУНТ'
        }
      </h2>
      <button onClick={ () => networkStore.logout() }>Выйти</button>
      <div>
        { networkStore.users.map((user: IUser) => {
          return <div key={ user._id }>{ user._id } { user.email }</div>;
        }) }
      </div>

      <ToastContainer/>
    </div>
  );
});
*/

export default App;
