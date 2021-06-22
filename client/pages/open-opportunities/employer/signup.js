import React from "react";
import { Row, Col, Button } from "antd";
import EmployerSignUp from "../../../comps/EmployerSignUp";

function employerSignUp() {
  return (
    <Row justify="center" align="middle" className="sign">
      <Col className="left-sign">
        <center>
          <img
            width="180"
            src="/images/home/sw-white.png"
            alt="smallworld logo"
          />
          <div className="line"></div>
          <p>
            Lorem ipsum dolor sit consectetur consectetur amet consectetur
            adipisicing elit. Illo itaque
          </p>
          <Button id="sign-btn">
            <a href="/open-opportunities/employer/signin">Sign In</a>
          </Button>
        </center>
      </Col>
      <Col className="right-sign sign-up">
        <EmployerSignUp />
      </Col>
    </Row>
  );
}

export default employerSignUp;
