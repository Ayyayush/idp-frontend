import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  ScrollText,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: Upload,
    },
    {
      name: "Extraction",
      path: "/extract",
      icon: FileText,
    },
    {
      name: "Summary",
      path: "/summary",
      icon: ScrollText,
    },
    {
      name: "Assistant",
      path: "/chat",
      icon: MessageSquare,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={toggleSidebar}
        className={`
          fixed
          inset-0
          bg-black/60
          z-40
          transition-opacity
          duration-300
          lg:hidden

          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          h-screen
          w-64
          bg-slate-950
          border-r
          border-slate-800
          text-white
          z-50
          flex
          flex-col
          transition-transform
          duration-300

          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                h-10
                w-10
                rounded-xl
                bg-gradient-to-r
                from-blue-500
                to-purple-500
                flex
                items-center
                justify-center
                "
              >
                <Sparkles size={18} />
              </div>

              <div>
                <h1 className="font-bold text-lg">
                  IDP Platform
                </h1>

                <p className="text-xs text-slate-400">
                  AI Document Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={toggleSidebar}
              className="
              lg:hidden
              p-2
              rounded-lg
              hover:bg-slate-800
              "
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all

                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4">
          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            p-4
            "
          >
            <p className="text-xs text-slate-400">
              AI Pipeline
            </p>

            <p className="text-green-400 font-medium mt-1">
              System Online
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;