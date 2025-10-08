import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [isLoggedIn, setisLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setisLoggedin,
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthWrapper, AuthContext };
