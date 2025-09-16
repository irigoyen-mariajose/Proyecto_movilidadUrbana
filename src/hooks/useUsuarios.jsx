import { useState, useEffect } from "react";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

 
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };


  const isAuthenticated = !!user;

  return { user, login, logout, isAuthenticated };
}
