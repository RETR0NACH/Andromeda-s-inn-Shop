import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer'; 

function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar toggleSidebar={toggleSidebar} />
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      <div className="page-content">
        <Header toggleSidebar={toggleSidebar} />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer /> 
      </div>
    </div>
  );
}

export default MainLayout;