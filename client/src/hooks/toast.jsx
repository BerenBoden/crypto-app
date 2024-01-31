import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const useToastNotificationsRedirect = () => {
  const location = useLocation();
  useEffect(() => {
    if (location?.state?.isRedirect) {
      if (location?.state?.type === "error") {
        toast.error(location?.state?.message);
        location.state.isRedirect = false;
        return;
      }
      toast.success(location?.state?.message);
      location.state.isRedirect = false;
    }
  }, [location?.state?.isRedirect]);
};