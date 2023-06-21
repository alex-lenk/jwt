import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <div className="account-pages my-5 pt-sm-5 container">
        <Outlet/>
      </div>
    </>
  );
};

export default PublicLayout;
