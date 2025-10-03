import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      navigate("/Home", { replace: true }); 
    }
  }, [navigate]); 


  const login = (email, pass) => {
    if (email === "test@test.com" && pass === "1234") {
      const newUser = { email, rol: "admin" };
      setUser(newUser);
      localStorage.setItem("usuario", JSON.stringify(newUser));
      navigate("/Home", { replace: true }); 
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
    navigate("/FrmIniciosesion", { replace: true }); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
