import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from './store';
import LoginForm from './components/LoginForm';
import Forgot from './components/Forgot';
import Main from './components/Main';
import Help from './components/Help';
import NotFound from './components/NotFound';

const PrivateRoute = observer(({ children }: { children: JSX.Element }) => {
  const { networkStore } = useStores();
  return networkStore.isAuth ? children : <Navigate to="/login" replace />;
});

const PublicRoute = observer(({ children }: { children: JSX.Element }) => {
  const { networkStore } = useStores();
  return networkStore.isAuth ? <Navigate to="/" replace /> : children;
});

const Routers = () => (

    <Routes>
      <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} >
        <Route path="help" element={<Help />} />
      </Route>
      <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
      <Route path="/forgot" element={<PublicRoute><Forgot /></PublicRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Routers;
