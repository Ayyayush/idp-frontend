import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">

      <div>
        <h2 className="font-semibold text-lg text-white">
          IDP Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          Intelligent Document Processing
        </p>
      </div>

      <div className="flex items-center gap-5">

        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
          System Online
        </span>

        <Bell
          size={20}
          className="text-slate-300 cursor-pointer"
        />

        <UserCircle
          size={28}
          className="text-slate-300 cursor-pointer"
        />

      </div>
    </div>
  );
}

export default Navbar;