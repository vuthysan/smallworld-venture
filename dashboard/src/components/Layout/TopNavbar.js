import React from "react";

import { Popover, Avatar } from "antd";
function TopNavbar() {
  const content = (
    <div>
      <a href="/#">Logout</a>
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
