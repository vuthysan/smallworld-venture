import React, { useContext } from "react";
// import UserContext from "../context/userContext";
import AuthContext from "../context/auth";
import { Dropdown, Menu } from "antd";

// === comps ===
import SignOut from "./SignOut";

function UserNavMenu() {
  // const { user } = useContext(UserContext);
  const { token } = useContext(AuthContext);

  // === user menu ===
  const UserMenu = token !== "" && (
    <Menu className="user-menu">
      {/* <p>{user.name.toUpperCase()}</p>
      <p className="email">{user.email}</p> */}
      <p>testing</p>
      <p className="email">email@gmail.com</p>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/profile"}
        >
          <img src="/images/navbar/settings.svg" alt="setting svg" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/posted"}
        >
          <img src="/images/navbar/job.svg" alt="setting svg" />
          Posted Job
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/company"}
        >
          <img src="/images/navbar/company.svg" alt="setting svg" />
          Company
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/record"}
        >
          <img src="/images/navbar/application.svg" alt="setting svg" />
          Application Record
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/addcompany"
        >
          <img src="/images/navbar/add-com-black.svg" alt="setting svg" />
          Add Company
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/addjob"
        >
          <img src="/images/navbar/addjob.svg" alt="setting svg" />
          Add job
        </a>
      </Menu.Item>

      <Menu.Item>
        <SignOut />
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {token !== "" && (
        <Dropdown
          overlay={UserMenu}
          placement="bottomRight"
          arrow
          trigger="click"
        >
          <img
            id="user-menu"
            src="/images/navbar/avatar.svg"
            alt="avatar menu svg"
          />
        </Dropdown>
      )}
    </>
  );
}

export default UserNavMenu;
