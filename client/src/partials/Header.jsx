import React from "react";
import UserMenu from "./header/UserMenu";
import { useSelector } from "react-redux";
import { BiSolidUserCircle } from "react-icons/bi";

function Header({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 !z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex">
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            {user.admin ? (
              <img
                src="/racist-sexist-white-male.webp"
                className="rounded-full w-10 h-10 object-cover"
              />
            ) : (
              <BiSolidUserCircle className="w-8 h-8" />
            )}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
