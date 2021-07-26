import React, { useContext } from "react";
import jwt from "jsonwebtoken";
import Cookie from "js-cookie";
import UserContext from "../context/userContext";
// === comps ===
import EmployerMenu from "../comps/EmployerMenu";
import JobSeekerMenu from "../comps/JobSeekerMenu";

function UserNavMenu() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        user.role === "employer" ? (
          <EmployerMenu id={user.id} />
        ) : (
          <JobSeekerMenu id={user.id} />
        )
      ) : (
        ""
      )}
    </>
  );
}

export default UserNavMenu;
