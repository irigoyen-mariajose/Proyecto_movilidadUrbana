import { useEffect } from "react";
import { useAuth } from "./Aute";
import { useNavigate } from "react-router-dom";

export default function BloqueoURL() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      if (user && ["admin", "preceptor", "profesor"].includes(user.rol)) {
        navigate(window.location.pathname, { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [user, navigate]);

  return null; 
}
