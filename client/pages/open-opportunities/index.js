import React, { useState } from "react";
import MetaTags from "../../comps/MetaTags";
import { Row, Col, Input } from "antd";
import DropDownMenu from "../../comps/DropDownMenu";
import LatestJob from "../../comps/LatestJob";
import InterestJob from "../../comps/InterestJob";

const { Search } = Input;

const steps = [
  {
    content: <LatestJob />,
  },
  {
    content: <InterestJob />,
  },
];
function index() {
  const [current, setCurrent] = useState(0);

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

                <DropDownMenu />
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
        <div className="container">
          <div className="search-job">
            <Search
              placeholder="input search text"
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

          <div className="job-list steps-content">{steps[current].content}</div>
        </div>
      </div>
    </>
  );
}

export default index;
