import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiTransferAlt } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { IoWalletOutline, IoCogOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { GrBitcoin } from "react-icons/gr";
import { useSelector } from "react-redux";
import { GiSellCard } from "react-icons/gi";
import { useLogout } from "../hooks/utility";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { pathname } = location;
  const hostname = window.location.hostname;
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current?.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const { dropdownOpen, setDropdownOpen, logout } = useLogout(user);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document?.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document?.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      <div
        className={`fixed inset-0  py-3 px-3 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:sidebar-expanded:!w-64 lg:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <NavLink end to={`/dashboard`} className="block">
            <div className="flex items-center text-white">
              <GrBitcoin className="w-8 h-8 mr-3" />
              <h3 className="text-lg capitalize">{hostname}</h3>
            </div>
          </NavLink>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              <li className="my-8">
                <NavLink
                  end
                  to={`/dashboard`}
                  className={`block truncate transition duration-150 ${
                    pathname === "/dashboard" ? "text-white" : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center pl-3">
                      <div>
                        <AiOutlineDashboard />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              <li className="my-8">
                <NavLink
                  end
                  to="/dashboard/withdraw"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("withdraw")
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center pl-3">
                      <div>
                        <BsCashCoin />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Withdraw
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li className="my-8">
                <NavLink
                  end
                  to="/dashboard/transfer"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("transfer")
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center pl-3">
                      <div>
                        <BiTransferAlt />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Transfer
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li className="my-8">
                <NavLink
                  end
                  to="/dashboard/buy-sell"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("buy-sell")
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center pl-3">
                      <div>
                        <GiSellCard />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Buy & Sell
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              <li className="my-8">
                <NavLink
                  end
                  to="/dashboard/wallet"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("wallet")
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center pl-3">
                      <div>
                        <IoWalletOutline />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        My Wallet
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li className="my-8">
                <NavLink
                  end
                  to="/dashboard/settings"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("settings")
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center pl-3">
                      <div>
                        <IoCogOutline />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Settings
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                More
              </span>
            </h3>
            <ul className="mt-3">
              {/* Authentication */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 `}>
                <div
                  className="flex items-center justify-between text-white cursor-pointer"
                  onClick={logout}
                >
                  <div className="grow flex items-center">
                    <IoIosLogOut />
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Sign Out
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
