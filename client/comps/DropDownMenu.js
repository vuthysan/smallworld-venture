import React from "react";
import { Dropdown, Menu } from "antd";
function DropDownMenu({ role }) {
  // console.log(role);

  // === Job seeker menu ===
  const JobSeekerMenu = (
    <Menu>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="/open-opportunities/jobseeker/signin"
        >
          Job Seeker
        </a>
      </Menu.Item>

      <Menu.Item>
        <a rel="noopener noreferrer" href="/open-opportunities/employer/signin">
          Employer
        </a>
      </Menu.Item>
    </Menu>
  );

  // === Emlployer Menu menu ===
  const EmployerMenu = (
    <Menu>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="/open-opportunities/jobseeker/signup"
        >
          Job Seeker
        </a>
      </Menu.Item>

      <Menu.Item>
        <a rel="noopener noreferrer" href="/open-opportunities/employer/signup">
          Employer
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <React.Fragment>
      {role === "employer" ? (
        <button className="opportunities-btn">Employer</button>
      ) : role === "jobseeker" ? (
        <button className="opportunities-btn">Job Seeker</button>
      ) : (
        <>
          <Dropdown
            overlay={JobSeekerMenu}
            placement="bottomCenter"
            trigger={["click", "hover"]}
            arrow
          >
            <button className="opportunities-btn">Sign In</button>
          </Dropdown>
          <Dropdown
            overlay={EmployerMenu}
            placement="bottomCenter"
            arrow
            trigger={["click", "hover"]}
          >
            <button className="opportunities-btn">Sign Up</button>
          </Dropdown>
        </>
      )}
    </React.Fragment>
  );
}

export default DropDownMenu;
