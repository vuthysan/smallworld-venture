import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [statusCode, setStatusCode] = useState();

  const ACCOUNTS_URL = process.env.ACCOUNTS_URL;

  function verifyToken() {
    // console.log(localStorage.getItem("refresh_token"));
    axios
      .get(`${ACCOUNTS_URL}/verify-token`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setToken(res.data.access_token);
      })
      .catch(async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          await localStorage.removeItem("access_token");
          await localStorage.removeItem("refresh_token");
          setStatusCode(err.response.status);
        }
        console.log(err.message);
      });
  }

  useEffect(() => {
    setInterval(() => {
      verifyToken();
    }, 14 * 60 * 1000);
    verifyToken();
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{ token, setToken, statusCode, setStatusCode }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContext;
