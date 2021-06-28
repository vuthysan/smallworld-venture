import React, { useState } from "react";
import MetaTags from "../../comps/MetaTags";
import { Row, Col, Input, Dropdown, Menu } from "antd";
import DropDownMenu from "../../comps/DropDownMenu";
import LatestJob from "../../comps/LatestJob";
import InterestJob from "../../comps/InterestJob";

const { Search } = Input;

// == job list steps (latest and interest) ==
const steps = [
  {
    content: <LatestJob />,
  },
  {
    content: <InterestJob />,
  },
];
// === add job and company dropdown ===
const addMenu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="#">
        <img
          className="addcom-img"
          width="25"
          height="25"
          src="/images/open-opportunities/add-com-black.svg"
          alt=""
        />
        Add Company
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="#">
        <img
          className="addjob-img"
          width="25"
          height="25"
          src="/images/open-opportunities/addjob.svg"
          alt=""
        />
        Add Job
      </a>
    </Menu.Item>
  </Menu>
);
function index() {
  const [current, setCurrent] = useState(0);
  // === get user info from local storage === 
  var user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.role);
  }

  // === steps for latest job and interest ===

  const next = () => {
    setCurrent(0);
    document.getElementById("interest-btn").className += ` not-active`;
    document.getElementById("latest-btn").className = "opportunities-btn";
  };

  const prev = () => {
    setCurrent(1);
    document.getElementById("latest-btn").className += ` not-active`;
    document.getElementById("interest-btn").className = "opportunities-btn";
  };

  // == search job ==
  const onSearch = (value) => console.log(value);
  return (
    <>
      <MetaTags
        title="Open-Opportunities"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dictum suscipit quis lectus quam elementum volutpat. Ac potenti ameutpat. Ac potenti amet, cras magna. Lacus amet consectetur condimentum turpis sed sed at commodo."
        canonical="https://smallworldventure.com/open-opportunities"
        thumbnail="https://smallworldventure.com/images/thumbnail/about.png"
      />
      <div className="open">
        {/*  === header ===  */}
        <div className="open-banner">
          <div className="container">
            <Row align="middle" justify="space-between">
              <Col md={15} lg={14} xl={10}>
                <h1>
                  <span>&lt;</span>
                  OPEN-OPPORTUNITIES
                  <span>/&gt;</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  dictum suscipit quis lectus quam elementum volutpat. Ac
                  potenti ameutpat. Ac potenti amet, cras magna.
                </p>

                <DropDownMenu role={user ? user.role : null} />
              </Col>
              <Col xs={0} sm={0} md={6}>
                <img
                  src="/images/open-opportunities/resume.svg"
                  alt="team work svg"
                />
              </Col>
            </Row>
          </div>
        </div>
        {/*  === end header ===  */}
        <div className="container">
          <div className="search-job">
            {user && user.role === "employer" ? (
              <Dropdown overlay={addMenu} placement="topCenter" arrow>
                <img
                  className="addjob-addcom"
                  width="40"
                  height="40"
                  src="/images/open-opportunities/add-com-yellow.svg"
                  alt="add svg"
                />
              </Dropdown>
            ) : (
              ""
            )}

            <Search
              placeholder="Search..."
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>

          <button id="latest-btn" className="opportunities-btn" onClick={next}>
            Latest Job
          </button>
          <button
            id="interest-btn"
            className="opportunities-btn not-active"
            onClick={prev}
          >
            Your Interest
          </button>
          {/* === job list === */}
          <div className="job-list steps-content">{steps[current].content}</div>
        </div>
      </div>
    </>
  );
}

export default index;
