import { createContext, useState, useEffect } from "react";
/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(null);

  // token ko localStorage me sync rakho
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // login ke time call hoga
  const login = (data) => {
    setToken(data.token);
    setUser(data.user);
  };

  // logout ke time call hoga
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
