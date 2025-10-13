// RUTA: src/components/layout/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer'; 

function MainLayout() {
  return (
    <>
      <Sidebar />
      <div className="page-content">
        <Header />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer /> 
      </div>
    </>
  );
}

export default MainLayout;