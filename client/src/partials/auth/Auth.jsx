import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

function Auth() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          isRedirect: true,
          message: "Please login to access that resource",
          type: "error",
        },
      });
    }
  }, []);

  return <Outlet />;
}

export default Auth;
