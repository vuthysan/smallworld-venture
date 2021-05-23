import React from "react";
import { Row, Col } from "antd";

// === icon ===
import { FaNetworkWired } from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import { BsBuilding } from "react-icons/bs";

function Dashbord() {
  return (
    <React.Fragment>
      <h1>Overview</h1>
      <Row gutter={40} align="middle">
        <Col>
          <Row align="middle" className="card card1" gutter={20}>
            <Col>
              <div className="card-icon card-icon1">
                <BsBuilding className="icon" />
              </div>
            </Col>
            <Col>
              <h1>4</h1>
              <p>Total Companies</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="card card2" align="middle" gutter={20}>
            <Col>
              <div className="card-icon card-icon2">
                <FaNetworkWired className="icon" />
              </div>
            </Col>
            <Col>
              <h1>8</h1>
              <p>Total Departments</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="card card3" align="middle" gutter={20}>
            <Col>
              <div className="card-icon card-icon3">
                <GiBullseye className="icon" />
              </div>
            </Col>
            <Col>
              <h1>20</h1>
              <p>Total Opportunities</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Dashbord;
