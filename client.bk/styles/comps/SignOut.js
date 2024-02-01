import React from "react";

function SignOut() {
  const handleLogout = async () => {
    await localStorage.removeItem("access_token");
    await localStorage.removeItem("refresh_token");
    await window.location.replace("/open-opportunities");
  };

  return (
    <a className="menu" onClick={handleLogout} rel="noopener noreferrer">
      <img src="/images/navbar/logout.svg" alt="setting svg" />
      Log Out
    </a>
  );
}

export default SignOut;
