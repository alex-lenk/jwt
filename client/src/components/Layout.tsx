import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';

const Layout = () => {
  return (
    <>
      <NavbarHeader/>

      <Outlet/>
    </>
  );
};

export default Layout;
