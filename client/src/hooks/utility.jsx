import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setUnauthenticated } from "../store/slices/auth/authSlice";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";

export function useCurrentPage() {
  const location = useLocation();
  if (location.pathname === "/dashboard") return "dashboard";
  const currentPage = location.pathname.split("/")[2];
  if (currentPage?.includes("-")) {
    const result = currentPage.replace("-", "");
    return result;
  }
  return currentPage;
}

export function useSelectedCrypto(cryptos) {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0].symbol);

  const balance = cryptos.find((crypto) => crypto.symbol === selectedCrypto);

  const [selectedCryptoBalance, setSelectedCryptoBalance] = useState(balance);

  useEffect(() => {
    setSelectedCryptoBalance(balance);
  }, [selectedCrypto]);
  return { selectedCrypto, setSelectedCrypto, selectedCryptoBalance };
}

export const useHostname = () => {
  const url = window.location.hostname;
  const hostname = url.slice(0, 1).toUpperCase() + url.slice(1);
  return hostname;
};

export const useCheckAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !location.state) {
      navigate("/dashboard");
    }
  }, [user]);
};

export const useLogout = (user) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    setDropdownOpen(!dropdownOpen);
    cookies.remove("token");
    cookies.remove("user");
    dispatch(setUnauthenticated());
    navigate("/login", {
      state: {
        message: "Logged out successfully.",
        user,
        isRedirect: true,
      },
    });
  };

  return { dropdownOpen, setDropdownOpen, logout };
};

export const useOutsideClick = (ref, callback, open) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, open]);
};

export const useEscKey = (callback, open) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        callback();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [callback, open]);
};
