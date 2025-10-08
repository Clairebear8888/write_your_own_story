import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        name: "Apple",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthWrapper, AuthContext };
