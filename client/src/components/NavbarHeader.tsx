import React from 'react';
import logoWs from '../assets/img/logo-w-s.svg';
import logoW from '../assets/img/logo-w.svg';
import { AccountCircleOutlined, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavbarHeader = () => {
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <a href="/control" className="logo logo-light">
              <span className="logo-sm"><img src={ logoWs } alt="" height="30"/></span>
              <span className="logo-lg"><img src={ logoW } alt="" height="40"/></span>
            </a>
          </div>
          <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect">
            <MenuOutlined/>
          </button>
        </div>

        <div className="d-flex">
          <button type="button" className="btn header-item waves-effect">
            <AccountCircleOutlined fontSize="large"/>
          </button>

          <div className="d-none d-lg-inline-block ms-1">
            <Link className="btn header-item noti-icon waves-effect text-danger" to="/control/logout">
              <LogoutOutlined className="me-1"/>
              <span>Выход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarHeader;
