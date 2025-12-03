import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  // Check expiry on load
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    const exp = localStorage.getItem("token_exp");

    if (savedToken && exp && Date.now() > Number(exp)) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_exp");
      return null;
    }
    return savedToken;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Set expiry when saving token
  function login(token, user) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;

    localStorage.setItem("token", token);
    localStorage.setItem("token_exp", expiry);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  // Logout user when token expires while user is on the webpage
  useEffect(() => {
    if (!token) return;

    const exp = Number(localStorage.getItem("token_exp"));
    const delay = exp - Date.now();

    if (delay <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(logout, delay);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
