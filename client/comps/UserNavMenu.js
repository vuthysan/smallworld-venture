import React, { useContext } from "react";
import UserContext from "../context/userContext";
import { Dropdown, Menu } from "antd";

// === comps ===
import SignOut from "./SignOut";

function UserNavMenu() {
  const { user } = useContext(UserContext);

  // === user menu ===
  const UserMenu = user && user.loggedIn && (
    <Menu className="user-menu">
      <p>{user.name.toUpperCase()}</p>
      <p className="email">{user.email}</p>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/profile/" + user.id}
        >
          <img src="/images/navbar/settings.svg" alt="setting svg" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/posted/" + user.id}
        >
          <img src="/images/navbar/job.svg" alt="setting svg" />
          Posted Job
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/companies/" + user.id}
        >
          <img src="/images/navbar/company.svg" alt="setting svg" />
          Companies
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/record/" + user.id}
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
      {user && user.loggedIn && (
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
