import React from "react";
import Logout from "../Layout/Logout";
import { Popover, Avatar } from "antd";
function TopNavbar() {
  const content = (
    <div>
      <Logout />
    </div>
  );
  return (
    <div className="top-nav">
      <Popover content={content} title="Username">
        <Avatar src="/images/avatar.svg" size={45} />
      </Popover>
    </div>
  );
}

export default TopNavbar;
