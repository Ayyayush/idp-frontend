import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;