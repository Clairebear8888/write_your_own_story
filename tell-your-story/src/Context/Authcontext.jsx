import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  <AuthContext.Provider
    value={{
      name: "Apple",
    }}
  >
    {children}
  </AuthContext.Provider>;
  return;
};

export { AuthWrapper, AuthContext };
