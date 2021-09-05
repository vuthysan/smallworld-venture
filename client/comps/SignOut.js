import React from "react";
import axios from "axios";

function SignOut() {
  const handleLogout = async () => {
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
