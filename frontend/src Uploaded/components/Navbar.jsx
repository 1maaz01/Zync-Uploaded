import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Navigation, ShipWheelIcon } from "lucide-react";

import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  return (
<nav className="playfair-font  bg-black border-b border-white/40  sticky top-0 z-30 h-16 flex items-center shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
              <div className="p-4 pl-0">
                <Link to="/" className="flex items-center gap-2.5 group">
                  <Navigation className="w-10 h-10 text-amber-600 tracking-wider animate-pulse" />
                  <span className="text-4xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 tracking-wider animate-pulse">
                      Zync
                  </span>
                </Link>
              </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </Link>
          </div>


          {/* User Avatar */}
          <div className="ml-3 relative">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-500 transition-all duration-200">
              <img 
                src={authUser?.profilePic} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
                rel="noreferrer" 
              />
            </div>
          </div>

          {/* Logout button */}
          <button 
            className="ml-2 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group"
            onClick={logoutMutation}
          >
            <LogOutIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
