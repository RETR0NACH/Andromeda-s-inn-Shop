// RUTA: src/components/layout/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function MainLayout() {
  return (
    <>
      <Sidebar />
      <div className="page-content">
        <Header />
        <main id="main-content">
          <Outlet /> {/* Aquí se renderizarán las páginas de la tienda */}
        </main>
      </div>
    </>
  );
}

export default MainLayout;