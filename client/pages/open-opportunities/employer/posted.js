import React from "react";
import { Divider, Row, Col } from "antd";

export default function posted() {
  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Posted Job</Divider>
      <Row className="outter-card" gutter={[12, 12]}>
        <Col xs={24} sm={12} md={8}>
          <div className="posted-card">
            <p className="position">Senior Front-End Web developer</p>
            <p className="company">Company name</p>
            <p className="city">Phnom Penh, July-15-2021</p>
            <button className="view">
              <a href={"/open-opportunities/employer/job/" + 1}>View Job</a>
            </button>
            <button className="view">
              <a href={"/open-opportunities/employer/job/applicants/" + 1}>
                View Applicants
              </a>
            </button>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div className="posted-card">
            <p className="position">Senior Front-End Web</p>
            <p className="company">Company name</p>
            <p className="city">Phnom Penh, July-15-2021</p>
            <button className="view">
              <a href={"/open-opportunities/employer/job/" + 1}>View Job</a>
            </button>
            <button className="view">
              <a href={"/open-opportunities/employer/job/applicants/" + 1}>
                View Applicants
              </a>
            </button>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div className="posted-card">
            <p className="position">Senior Front-End Web developer</p>
            <p className="company">Company name</p>
            <p className="city">Phnom Penh, July-15-2021</p>
            <button className="view">
              <a href={"/open-opportunities/employer/job/" + 1}>View Job</a>
            </button>
            <button className="view">
              <a href={"/open-opportunities/employer/job/applicants/" + 1}>
                View Applicants
              </a>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
