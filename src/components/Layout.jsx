// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div style={styles.layout}>
      <Navbar />  {/* Include Navbar by default */}
      <div style={styles.content}>
        <Outlet />  {/* This is where the current page content will be injected */}
      </div>
      <Footer />  {/* Include Footer by default */}
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    paddingBottom: '4rem', // To prevent content being hidden behind footer
  },
};

export default Layout;
