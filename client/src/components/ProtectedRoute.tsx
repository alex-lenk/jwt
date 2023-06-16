import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store'; // assuming you have a hook to use your store

const ProtectedRoute: React.FC = observer(() => {
  const store = useStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!store.isAuth) {
      navigate('/login');
    }
  }, [store.isAuth, navigate]);

  return store.isAuth ? <Outlet/> : null;
});

export default ProtectedRoute;
