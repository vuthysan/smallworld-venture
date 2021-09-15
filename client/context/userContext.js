import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  async function getLoggedIn() {
    // const res = await axios.get(
    //   "https://backend.smallworldventure.com/user/verifyToken"
    // );

    const res = await axios.get("http://localhost:5000/user/verifyToken");
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
