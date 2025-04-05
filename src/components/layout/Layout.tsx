
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1">
          <AppSidebar isSidebarOpen={isSidebarOpen} />
          <main className={cn("flex-1 p-4 md:p-6 transition-all duration-200 mt-16", {
            "md:ml-64": isSidebarOpen,
            "ml-16": !isSidebarOpen
          })}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
