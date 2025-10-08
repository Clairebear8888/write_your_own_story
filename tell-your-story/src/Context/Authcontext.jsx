import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthWrapper, AuthContext };
