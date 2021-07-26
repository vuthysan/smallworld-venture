import React, { useEffect, useState, createContext } from "react";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  function getUser() {
    const token = Cookie.get("access_token");
    if (!token) {
      setUser({});
    }
    setUser(jwt.decode(token));
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
