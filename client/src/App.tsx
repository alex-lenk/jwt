import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import LoginForm from './components/LoginForm';
import Loader from './components/common/Loader';
import { useStores } from './store';

function App() {
  const {networkStore} = useStores();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      networkStore.checkAuth();
    }
  }, [networkStore]);

  if (networkStore.isLoading) {
    return <Loader/>;
  }

  return (
    <div>
      <div className="account-pages my-5 pt-sm-5 container">
        { !networkStore.isAuth
          ? <LoginForm/>
          : <>
            <h1>{ networkStore.isAuth ? `Пользователь авторизован ${ networkStore.user.email }` : 'АВТОРИЗУЙТЕСЬ' }</h1>
            <h1>{ networkStore.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!' }</h1>
            <button onClick={ () => networkStore.logout() }>Выйти</button>
          </>
        }
      </div>
    </div>
  );
}

export default observer(App);


/*
import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { useStores } from './store';
import { getFromStorage } from './helpers/storage';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './components/Main';
const App: FC = observer(() => {
  const {networkStore} = useStores();
  useEffect(() => {
    if (getFromStorage('token')) {
      networkStore.checkAuth();
    }
  }, [networkStore]);
  return (
    <div className="container page__content">
      <HelmetProvider>
        <Routes>
          <Route path="/login" element={ <LoginForm/> }/>
          <Route path="/" element={ <ProtectedRoute isAuth={ networkStore.isAuth }/> }>
            <Route index element={ <Main /> }/>
          </Route>
          <Route path="*" element={ <NotFound/> }/>
        </Routes>
      </HelmetProvider>

      <ToastContainer/>
    </div>
  );
});
export default App;
*/
