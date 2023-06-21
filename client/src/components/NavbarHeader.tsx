import { Link } from 'react-router-dom';
import { AccountCircleOutlined, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useStores } from '../store';
import { ROUTES_LINKS } from './routesLinks';
import logoWs from '../assets/img/logo-w-s.svg';
import logoW from '../assets/img/logo-w.svg';

const NavbarHeader = () => {
  const { networkStore } = useStores();

  const handleLogout = () => networkStore.logout();

  const handleMenuClick = () => networkStore.toggleMenu();

  return (
    <header id="page-topbar" className="navbar-header">
      <div className="d-flex">
        <button className="btn btn-sm px-3 font-size-16 header-item waves-effect" onClick={ handleMenuClick }>
          <MenuOutlined/>
        </button>
      </div>

      <div className="d-flex">
        <button type="button" className="btn header-item waves-effect">
          <AccountCircleOutlined fontSize="large"/>
        </button>

        <div className="d-none d-lg-inline-block ms-1">
          <button className="btn header-item noti-icon waves-effect text-danger" onClick={ handleLogout }>
            <LogoutOutlined className="me-1"/>
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavbarHeader;
