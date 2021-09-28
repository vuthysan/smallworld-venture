import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const API_URL = process.env.API_URL1;
  async function getLoggedIn() {
    const res = await axios.get(API_URL + "/user/verifyToken");
    const data = await res.data;
    setUser(data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ user, getLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
