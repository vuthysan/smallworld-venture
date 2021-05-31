import React from "react";
import Cookie from "js-cookie";
function Logout() {
  const handleLogout = () => {
    Cookie.remove("swtoken");
    window.location = "/login";
  };
  return (
    <a href="/#" onClick={handleLogout}>
      Logout
    </a>
  );
}

export default Logout;
