import React, { useState, useRef, useEffect } from "react";
import { useOutsideClick, useEscKey } from "../../hooks/utility";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";
import { IoMdNotificationsOutline } from "react-icons/io";

function Notifications() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  useOutsideClick(
    dropdown,
    () => {
      setDropdownOpen(false);
    },
    dropdownOpen
  );

  useEscKey(() => {
    setDropdownOpen(false);
  }, dropdownOpen);
  return (
    <div className="relative inline-flex ml-3">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <IoMdNotificationsOutline className="w-5 h-5 text-slate-500" />
        {/* <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div> */}
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 -mr-48 sm:mr-0 min-w-80 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            <li className="border-b border-slate-200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="/dashboard/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                  📣{" "}
                  <span className="font-medium text-slate-800">
                    Thanks for signing up! Edit your information in settings
                  </span>{" "}
                </span>
                <span className="block text-xs font-medium text-slate-400">
                  {new Date().toISOString().slice(0, 10)}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default Notifications;
