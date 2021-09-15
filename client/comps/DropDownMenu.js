import React from "react";
import { Dropdown, Menu } from "antd";
function DropDownMenu({ user }) {
  return (
    <React.Fragment>
      {user && user.loggedIn ? (
        <button className="opportunities-btn view-openning">
          <a href="#joblist">View Openning</a>
        </button>
      ) : (
        <>
          <button className="opportunities-btn">
            <a href="/open-opportunities/signin">Sign In</a>
          </button>

          <button className="opportunities-btn">
            {" "}
            <a href="/open-opportunities/signup">Sign Up</a>
          </button>
        </>
      )}
    </React.Fragment>
  );
}

export default DropDownMenu;
