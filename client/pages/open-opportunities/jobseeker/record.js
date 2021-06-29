import React from "react";
import { Divider, Row, Col } from "antd";
function Record() {
  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Applications Record</Divider>
      <Row className="outter-card" gutter={[12, 12]}>
        <Col xs={24} sm={12} md={8}>
          <div className="card">
            <p className="position">Senior Front-End Web developer</p>
            <p className="company">Company name</p>
            <p className="city">Phnom Penh, July-15-2021</p>
            <button class="view">Applied Date: July, 24th 2021</button>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div className="card">
            <p className="position">Senior Front-End Web developer</p>
            <p className="company">Company name</p>
            <p className="city">Phnom Penh, July-15-2021</p>
            <button class="view">Applied Date: July, 24th 2021</button>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div className="card">
            <p className="position">Senior Front-End Web developer</p>
            <p className="company">Company name</p>
            <p className="city">Phnom Penh, July-15-2021</p>
            <button class="view">Applied Date: July, 24th 2021</button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Record;
