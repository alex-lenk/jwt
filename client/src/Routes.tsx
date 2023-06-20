import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from './store';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import Help from './components/Help';
import NotFound from './components/NotFound';

const Routes = observer(() => {
  const {networkStore} = useStores();

  const PrivateRoutes = useRoutes([
    {path: '/', element: <Main/>},
    {path: '/help', element: <Help/>},
  ]);

  const PublicRoute = useRoutes([
    {path: '/', element: <LoginForm/>},
  ]);

  return useRoutes([
    {
      path: '/',
      element: networkStore.isAuth ? PrivateRoutes : PublicRoute,
    },
    {
      path: '/*',
      element: <NotFound/>,
    },
  ]);
});

export default Routes;
