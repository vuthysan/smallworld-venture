import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const res = await axios.get(
      "https://backend.smallworldventure.com/user/verifyToken"
    );
    const data = res.data;
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
