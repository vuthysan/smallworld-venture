import React from "react";
import axios from "axios";
// import { useMutation } from "@apollo/client";
// import { LOGOUT } from "../graphql/mutation";

function SignOut() {
  // const [logout] = useMutation(LOGOUT);
  const handleLogout = async () => {
    // await logout().then((res) => console.log(res.data.logout));
    // console.log(2);
    const res = await axios.get(
      "https://backend.smallworldventure.com/user/logout"
    );
    window.location.replace("/open-opportunities");
  };

  return (
    <a
      className="menu"
      onClick={handleLogout}
      rel="noopener noreferrer"
      // href="/open-opportunities"
    >
      <img src="/images/navbar/logout.svg" alt="setting svg" />
      Log Out
    </a>
  );
}

export default SignOut;
