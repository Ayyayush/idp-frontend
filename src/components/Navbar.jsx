import {
  Bell,
  UserCircle,
  Sparkles,
} from "lucide-react";

import { useContext } from "react";

import { DocumentContext } from "../context/DocumentContext";

function Navbar() {

  const { result } =
    useContext(DocumentContext);

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
      px-8
      py-4
      "
    >

      <div className="flex justify-between items-center">

        <div>

          <h2 className="font-bold text-xl text-white">
            IDP Dashboard
          </h2>

          <p className="text-sm text-slate-400">
            Intelligent Document Processing
          </p>

        </div>

        <div className="flex items-center gap-5">

          {result && (
            <div
              className="
              hidden
              md:flex
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

              <span className="text-blue-400 text-sm">
                {result.document_type}
              </span>

            </div>
          )}

          <div
            className="
            px-4
            py-2
            rounded-full
            bg-green-500/10
            border
            border-green-500/20
            text-green-400
            text-sm
            "
          >
            ● System Online
          </div>

          <Bell
            size={20}
            className="
            text-slate-400
            hover:text-white
            cursor-pointer
            transition-all
            "
          />

          <UserCircle
            size={30}
            className="
            text-slate-400
            hover:text-white
            cursor-pointer
            transition-all
            "
          />

        </div>

      </div>

    </header>
  );
}

export default Navbar;