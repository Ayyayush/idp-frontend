import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="transition-all duration-300 lg:ml-64">
        <Navbar
          toggleSidebar={toggleSidebar}
        />

        <main
          className="
          p-4
          sm:p-6
          lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;