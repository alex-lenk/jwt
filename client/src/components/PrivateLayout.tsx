import { Outlet } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';
import VerticalMenu from './VerticalMenu';
import { useStores } from '../store';

const PrivateLayout = () => {
  const { networkStore } = useStores();

  return (
    <>
      <NavbarHeader/>
      <VerticalMenu/>

      <div className="main-content page-content">
        <div className="container-fluid">
          {
            networkStore.user.isActivated
              ? <Outlet/>
              : <div className="alert alert-danger col-sm-5" role="alert">Подтвердите Аккаунт</div>
          }
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
