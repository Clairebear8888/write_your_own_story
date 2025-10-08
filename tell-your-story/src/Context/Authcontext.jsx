import { createContext, useContext, useState } from "react";

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
