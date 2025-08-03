import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import clsx from "clsx";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className={clsx("min-h-screen bg-black  ",
    )}>
      <div className="flex-shrink-0 2xl:flex 2xl:justify-center 2xl:items-center">
          <div className="flex justify-center 2xl:min-w-[1536px] max-w-[1600px]">
              {showSidebar && <Sidebar />}

              <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto">{children}</main>
              </div>
          </div>
      </div>
    </div>
  );
};
export default Layout;
