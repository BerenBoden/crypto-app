import { useRef } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";
import { useSelector } from "react-redux";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useLogout } from "../../hooks/utility";
import { useOutsideClick, useEscKey } from "../../hooks/utility";

function UserMenu() {
  const { user } = useSelector((state) => state.auth);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { dropdownOpen, setDropdownOpen, logout } = useLogout(user);

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
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">
            {user?.username}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
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
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">{user?.username}</div>
            {user?.admin ? (
              <div className="text-xs text-green-500 italic flex items-center">
                Verified &nbsp;
                <AiOutlineCheckCircle />
              </div>
            ) : (
              <div className="text-xs text-red-500 italic flex items-center">
                Unverified &nbsp;
                <AiOutlineCloseCircle />
              </div>
            )}
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/dashboard/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <div
                className="font-medium text-sm text-indigo-500 cursor-pointer
                hover:text-indigo-600 flex items-center py-1 px-3"
                onClick={logout}
              >
                Sign Out
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
