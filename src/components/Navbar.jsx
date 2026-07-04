import {
  Bell,
  UserCircle,
  Sparkles,
  Menu,
} from "lucide-react";

import { useContext } from "react";

import { DocumentContext } from "../context/DocumentContext";

function Navbar({ toggleSidebar }) {
  const { result } = useContext(DocumentContext);

  return (
    <header
      className="
      sticky
      top-0
      z-40
      bg-slate-900/80
      backdrop-blur-md
      border-b
      border-slate-800
      px-4
      sm:px-6
      lg:px-8
      py-3
      "
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="
            lg:hidden
            p-2
            rounded-lg
            bg-slate-800
            hover:bg-slate-700
            transition
            flex-shrink-0
            "
          >
            <Menu size={22} className="text-white" />
          </button>

          <div className="min-w-0">
            <h2
              className="
              text-lg
              sm:text-xl
              font-bold
              text-white
              truncate
              "
            >
              IDP Dashboard
            </h2>

            <p
              className="
              hidden
              sm:block
              text-sm
              text-slate-400
              truncate
              "
            >
              Intelligent Document Processing
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {result && (
            <div
              className="
              hidden
              xl:flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-blue-500/10
              border
              border-blue-500/20
              "
            >
              <Sparkles
                size={16}
                className="text-blue-400"
              />

              <span className="text-blue-400 text-sm whitespace-nowrap">
                {result.document_type}
              </span>
            </div>
          )}

          <div
            className="
            hidden
            md:flex
            items-center
            px-4
            py-2
            rounded-full
            bg-green-500/10
            border
            border-green-500/20
            text-green-400
            text-sm
            whitespace-nowrap
            "
          >
            ● System Online
          </div>

          <button
            className="
            p-2
            rounded-lg
            hover:bg-slate-800
            transition
            "
          >
            <Bell
              size={20}
              className="text-slate-400 hover:text-white"
            />
          </button>

          <button
            className="
            p-1
            rounded-full
            hover:bg-slate-800
            transition
            "
          >
            <UserCircle
              size={32}
              className="text-slate-400 hover:text-white"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;