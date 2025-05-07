import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [someChange, SetChange] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, someChange, SetChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
