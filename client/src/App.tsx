import { observer } from 'mobx-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useStores } from './store';
import { ROUTES_LINKS } from './components/routesLinks';
import LoginForm from './components/LoginForm';
import Forgot from './components/Forgot';
import Main from './components/Main';
import Help from './components/Help';
import NotFound from './components/NotFound';
import PrivateLayout from './components/PrivateLayout';
import PublicLayout from './components/PublicLayout';

const App = () => {
  const { networkStore } = useStores();

  const PrivateRoute = observer(() => {
    return networkStore.isAuth ? <PrivateLayout/> : <Navigate to={ ROUTES_LINKS.LOGIN } replace/>;
  });

  const PublicRoute = observer(() => {
    return networkStore.isAuth ? <Navigate to={ ROUTES_LINKS.MAIN } replace/> : <PublicLayout/>;
  });

  return (
    <Routes>
      <Route path={ ROUTES_LINKS.MAIN } element={ <PrivateRoute/> }>
        <Route index element={ <Main/> }/>
        <Route path={ ROUTES_LINKS.HELP } element={ <Help/> }/>
      </Route>
      <Route path={ ROUTES_LINKS.MAIN } element={<PublicRoute/>}>
        <Route path={ ROUTES_LINKS.LOGIN } element={ <LoginForm/> }/>
        <Route path={ ROUTES_LINKS.FORGOT } element={ <Forgot/> }/>
      </Route>
      <Route path="*" element={ <NotFound/> }/>
    </Routes>
  );
};

export default App;
