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
          {" "}
          <a href="/open-opportunities/signin">
            <button className="opportunities-btn">Sign In</button>
          </a>
          <a href="/open-opportunities/signup">
            <button className="opportunities-btn"> Sign Up</button>
          </a>
        </>
      )}
    </React.Fragment>
  );
}

export default DropDownMenu;
