import React from "react";
import { Row, Col } from "antd";

// === json data ===
import jobs from "../data/jobs.json";

function InterestJob() {
  return (
    <Row wrap={true} gutter={[0, 5]}>
      {jobs.map((res) => {
        const { id, position, companyName, city, createdAt } = res;
        return (
          <Col key={id} md={14}>
            <Row className="job-card" align="middle" justify="space-between">
              <Col>
                <a
                  href={`/open-opportunities/detail/${id}`}
                  className="position"
                >
                  {position}
                </a>
                <br />
                <a
                  href={`/open-opportunities/${companyName}`}
                  className="company"
                >
                  {companyName}
                </a>
                <br />
                <p className="city">{city}</p>
              </Col>
              <Col>
                <p className="date">{createdAt}</p>
                <button className="apply-btn">
                  <a href="/open-opportunities/jobseeker/signin">Apply Now</a>
                </button>
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
}

export default InterestJob;
