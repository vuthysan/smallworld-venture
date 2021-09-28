import React from "react";
import { Dropdown, Menu } from "antd";
function DropDownMenu({ token }) {
  return (
    <React.Fragment>
      {token !== "" ? (
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
