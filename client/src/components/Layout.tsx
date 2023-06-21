import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';
import VerticalMenu from './VerticalMenu';

const Layout = () => {
  return (
    <>
      <NavbarHeader/>
      <VerticalMenu/>

      <div className="main-content page-content">
        <div className="container-fluid">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Layout;
