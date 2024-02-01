import React, { useContext } from "react";
import { GET_USER } from "../graphql/query";
import { useQuery } from "@apollo/client";
import AuthContext from "../context/auth";
import { Dropdown, Menu, Spin } from "antd";

// === comps ===
import SignOut from "./SignOut";

function UserNavMenu() {
  const { token } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_USER);

  if (loading) {
    return <Spin size="large" />;
  }

  // === user menu ===
  const UserMenu = token !== "" && (
    <Menu className="user-menu">
      <p>{data.get_user.name.toUpperCase()}</p>
      <p className="email">{data.get_user.email}</p>
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
