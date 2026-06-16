import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  ScrollText,
  MessageSquare,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-950 text-white p-5 border-r border-slate-800">
      
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          IDP Platform
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          AI Document Intelligence
        </p>
      </div>

      <nav className="flex flex-col gap-3">

        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-all duration-300"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-all duration-300"
        >
          <Upload size={18} />
          Upload
        </Link>

        <Link
          to="/extract"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-all duration-300"
        >
          <FileText size={18} />
          Extraction
        </Link>

        <Link
          to="/summary"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-all duration-300"
        >
          <ScrollText size={18} />
          Summary
        </Link>

        <Link
          to="/chat"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-all duration-300"
        >
          <MessageSquare size={18} />
          Assistant
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;