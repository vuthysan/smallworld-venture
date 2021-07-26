import React from "react";
import { Dropdown, Menu } from "antd";
import { GET_EMPLOYER } from "../graphql/query";
import { useQuery } from "@apollo/client";
// === comps ===
import SignOut from "./SignOut";

function EmployerMenu({ id }) {
  const { loading, data } = useQuery(GET_EMPLOYER, {
    variables: { id },
  });
  if (loading) return "";
  const { get_employer } = data;

  // === employer menu ===
  const EmployerMenu = (
    <Menu className="user-menu">
      <p>{get_employer.name.toUpperCase()}</p>
      <p className="email">{get_employer.email}</p>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/employer/profile"
        >
          <img src="/images/navbar/settings.svg" alt="setting svg" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/employer/posted"
        >
          <img src="/images/navbar/job.svg" alt="setting svg" />
          Posted Job
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/employer/companies"
        >
          <img src="/images/navbar/company.svg" alt="setting svg" />
          Companies
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/employer/addcompany"
        >
          <img src="/images/navbar/add-com-black.svg" alt="setting svg" />
          Add Company
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/employer/addjob"
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
    <Dropdown
      overlay={EmployerMenu}
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
  );
}

export default EmployerMenu;
