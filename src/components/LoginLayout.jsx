// src/components/LoginLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <div>
      <Outlet />  {/* Only render the login page here */}
    </div>
  );
};

export default LoginLayout;
