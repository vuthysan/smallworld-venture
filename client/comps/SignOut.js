import React from "react";
import Cookie from "js-cookie";

function SignOut() {
  const handleLogout = async () => {
    await Cookie.remove("access_token");
    await Cookie.remove("refresh_token");
  };
  return (
    <a
      className="menu"
      onClick={handleLogout}
      rel="noopener noreferrer"
      href="/open-opportunities"
    >
      <img src="/images/navbar/logout.svg" alt="setting svg" />
      Log Out
    </a>
  );
}

export default SignOut;
