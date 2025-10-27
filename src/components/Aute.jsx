import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * @variable AuthContext
 */
const AuthContext = createContext();               

/**
 * 
 * @param {*} param0 
 * @returns 
 *  <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 


  /**
   * useEffect () => navigate
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      navigate("/Home", { replace: true }); 
    }
  }, [navigate]); 

  /**
   * 
   * @param {*} email 
   * @param {*} pass 
   * @returns 
   */

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

  /**
   * @variable logout
   */

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

/**
 * 
 * @returns useContext
 */
export function useAuth() {
  return useContext(AuthContext);
}
