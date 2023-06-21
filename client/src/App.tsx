import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useStores } from './store';
import { ROUTES_LINKS } from './components/routesLinks';
import Main from './components/Main';
import Help from './components/Help';
import LoginForm from './components/LoginForm';
import Forgot from './components/Forgot';
import NotFound from './components/NotFound';
import Layout from './components/Layout';

const App = observer(() => {
  const PrivateRoute = observer(({ children }: { children: JSX.Element }) => {
    const { networkStore } = useStores();
    return networkStore.isAuth ? children : <Navigate to={ ROUTES_LINKS.LOGIN } replace/>;
  });

  const PublicRoute = observer(({ children }: { children: JSX.Element }) => {
    const { networkStore } = useStores();
    return networkStore.isAuth
      ? <Navigate to={ ROUTES_LINKS.MAIN } replace/>
      : <div className="account-pages my-5 pt-sm-5 container">{ children }</div>;
  });

  return (
    <Routes>
      <Route path={ ROUTES_LINKS.MAIN } element={ <PrivateRoute><Layout/></PrivateRoute> }>
        <Route index element={ <Main/> }/>
        <Route path={ ROUTES_LINKS.HELP } element={ <Help/> }/>
      </Route>
      <Route path={ ROUTES_LINKS.LOGIN } element={ <PublicRoute><LoginForm/></PublicRoute> }/>
      <Route path={ ROUTES_LINKS.FORGOT } element={ <PublicRoute><Forgot/></PublicRoute> }/>
      <Route path="*" element={ <NotFound/> }/>
    </Routes>
  );
});

export default App;
