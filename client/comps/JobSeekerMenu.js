import React from "react";
import { Dropdown, Menu } from "antd";
import { GET_JOBSEEKER } from "../graphql/query";
import { useQuery } from "@apollo/client";
// === comps ===
import SignOut from "./SignOut";

function JobSeekerMenu({ id }) {
  const { loading, data } = useQuery(GET_JOBSEEKER, {
    variables: { id },
  });
  if (loading) return "";
  const { get_jobseeker } = data;
  // console.log(get_jobseeker);

  // === job seeker menu ===
  const SeekerMenu = (
    <Menu className="user-menu">
      <p>{get_jobseeker.name.toUpperCase()}</p>
      <p className="email">{get_jobseeker.email}</p>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/jobseeker/profile/" + id}
        >
          <img src="/images/navbar/settings.svg" alt="setting svg" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href={"/open-opportunities/jobseeker/record/" + id}
        >
          <img src="/images/navbar/application.svg" alt="setting svg" />
          Application Record
        </a>
      </Menu.Item>
      <Menu.Item>
        <SignOut />
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={SeekerMenu}
      placement="bottomCenter"
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

export default JobSeekerMenu;
