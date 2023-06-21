import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useStores } from './store';
import Main from './components/Main';
import Help from './components/Help';
import LoginForm from './components/LoginForm';
import Forgot from './components/Forgot';
import NotFound from './components/NotFound';
import Layout from './components/Layout';

const App = observer(() => {
  const PrivateRoute = observer(({ children }: { children: JSX.Element }) => {
    const { networkStore } = useStores();
    return networkStore.isAuth ? children : <Navigate to="/login" replace/>;
  });

  const PublicRoute = observer(({ children }: { children: JSX.Element }) => {
    const { networkStore } = useStores();
    return networkStore.isAuth
      ? <Navigate to="/" replace/>
      : <div className="account-pages my-5 pt-sm-5 container">{ children }</div>;
  });

  return (
    <Routes>
      <Route path="/" element={ <PrivateRoute><Layout/></PrivateRoute> }>
        <Route index element={ <Main/> }/>
        <Route path="/help" element={ <Help/> }/>
      </Route>
      <Route path="/login" element={ <PublicRoute><LoginForm/></PublicRoute> }/>
      <Route path="/forgot" element={ <PublicRoute><Forgot/></PublicRoute> }/>
      <Route path="*" element={ <NotFound/> }/>
    </Routes>
  );
});

export default App;
