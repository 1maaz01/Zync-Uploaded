import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { Bell, Home, Navigation, Users } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="playfair-font  w-64 bg-black border-r border-gray-800 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Navigation className="w-12 h-12 text-yellow-400 group-hover:rotate-180 transition-transform duration-700" />
          <span className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 tracking-wider animate-pulse">
              Zync
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`flex items-center justify-start w-full gap-3 px-3 py-3 rounded-lg transition-all duration-1000 ${
            currentPath === "/" 
              ? "bg-white/5 backdrop-blur-lg text-white shadow-lg border-amber-600 border shadow-amber-600" 
              : "text-gray-300 hover:bg-white/20 hover:text-white border-0"
          }`}
        >
          <Home className="size-5" />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex items-center border-0 justify-start w-full gap-3 px-3 py-3 rounded-lg transition-all duration-1000 ${
            currentPath === "/notifications" 
              ? "bg-black backdrop-blur-lg text-white shadow-lg border-amber-600 border shadow-amber-600" 
              : "text-gray-300 hover:bg-white/20 hover:text-white border-0"
          }`}
        >
          <Bell className="size-5" />
          <span className="font-medium">Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-400/30">
              <img 
                src={authUser?.profilePic} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-white">{authUser?.fullName}</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-400 inline-block animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;