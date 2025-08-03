import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import clsx from "clsx";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className={clsx("min-h-screen bg-black 2xl:w-[1536px] ",
          showSidebar && "2xl:flex 2xl:justify-center 2xl:items-center"
    )}>
      <div className={clsx("flex-shrink-0 ",
          showSidebar && "max-w-[1700px] w-full"
      ) }>
          <div className="flex">
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
