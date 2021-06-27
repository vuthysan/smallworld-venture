import React from "react";
import { Divider, Row, Col } from "antd";
function companies() {
  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Companies</Divider>
      <Row className="outter-card" gutter={[12, 12]}>
        <Col md={8}>
          <div className="com-card">
            <div className="img">
              <img height="60" src="/images/testcom.png" alt="company logo" />
            </div>
            <p>
              <span className="content"> Company Name:</span>Koompi
            </p>
            <p>
              <span className="content"> Company City:</span>Phnom Penh
            </p>
            <p>
              <span className="content"> About Company:</span>Koompi, together
              with KOOMPI OS, are...
            </p>
            <button className="view">
              <a href="#">View Company </a>
            </button>
          </div>
        </Col>
        <Col md={8}>
          <div className="com-card">
            <div className="img">
              <img height="60" src="/images/sw-gray.png" alt="company logo" />
            </div>
            <p>
              <span className="content"> Company Name:</span>Koompi
            </p>
            <p>
              <span className="content"> Company City:</span>Koompi
            </p>
            <p>
              <span className="content"> About Company:</span>Koompi, together
              with KOOMPI OS, are...
            </p>
            <button className="view">
              <a href="#">View Company </a>
            </button>
          </div>
        </Col>{" "}
        <Col md={8}>
          <div className="com-card">
            <div className="img">
              <img
                height="60"
                src="/images/about/KOOMPI.png"
                alt="company logo"
              />
            </div>
            <p>
              <span className="content"> Company Name:</span>Koompi
            </p>
            <p>
              <span className="content"> Company City:</span>Koompi
            </p>
            <p>
              <span className="content"> About Company:</span>Koompi, together
              with KOOMPI OS, are...
            </p>
            <button className="view">
              <a href="#">View Company </a>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default companies;
