import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const loggedIn = await axios.get("http://localhost:5000/auth/verifyToken");
    setLoggedIn(loggedIn.data);
  }
  useEffect(async () => {
    getLoggedIn();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}
export default AuthContext;
export { AuthContextProvider };
