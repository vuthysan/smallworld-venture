import React from "react";
import { Menu, Dropdown } from "antd";

function UserNavMenu() {
  var user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const handleLogout = () => {
    localStorage.clear();
  };

  // === employer menu ===
  const EmMenu = (
    <Menu className="user-menu">
      <p>Sea Viseth</p>
      <p className="email">seaviseth@gmail.com</p>
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
        <a
          className="menu"
          onClick={handleLogout}
          rel="noopener noreferrer"
          href="/open-opportunities"
        >
          <img src="/images/navbar/logout.svg" alt="setting svg" />
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  // job seeker menu ===
  const SeMenu = (
    <Menu className="user-menu">
      <p>Sea Viseth</p>
      <p className="email">seaviseth@gmail.com</p>
      <Menu.Item>
        <a
          className="menu"
          rel="noopener noreferrer"
          href="/open-opportunities/jobseeker/profile"
        >
          <img src="/images/navbar/settings.svg" alt="setting svg" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="menu" rel="noopener noreferrer" href="#">
          <img src="/images/navbar/application.svg" alt="setting svg" />
          Application Record
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className="menu"
          onClick={handleLogout}
          rel="noopener noreferrer"
          href="/open-opportunities"
        >
          <img src="/images/navbar/logout.svg" alt="setting svg" />
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {user ? (
        user.role === "employer" ? (
          <Dropdown
            overlay={EmMenu}
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
        ) : (
          <Dropdown
            overlay={SeMenu}
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
        )
      ) : (
        ""
      )}
    </>
  );
}

export default UserNavMenu;
