import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_OPPORTUNITIES,
  GET_DEPARTMENTS,
  GET_COMPANIES,
  GET_MESSAGES,
  GET_APPLICATIONS,
} from "../../graphql/query";
import { Row, Col, Spin } from "antd";
// === icon ===
import { FaNetworkWired, FaRegIdBadge } from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import { BsBuilding } from "react-icons/bs";
import { GoMail } from "react-icons/go";

function Dashbord() {
  const { loading: loadingDep, data: depData } = useQuery(GET_DEPARTMENTS);
  const { loading: loadingCom, data: comData } = useQuery(GET_COMPANIES);
  const { loading: loadingOpp, data: OppData } = useQuery(GET_OPPORTUNITIES);
  const { loading: loadingMsg, data: MsgData } = useQuery(GET_MESSAGES);
  const { loading: loadingApp, data: AppData } = useQuery(GET_APPLICATIONS);

  // console.log(depData);
  // console.log(comData);
  // console.log(OppData);
  return (
    <React.Fragment>
      <h1>Overview</h1>
      <Row gutter={[40, 20]} align="middle">
        <Col>
          {loadingCom ? (
            <Spin className="dash-loading" size="large" />
          ) : (
            <Row align="middle" className="card card1" gutter={20}>
              <Col>
                <div className="card-icon card-icon1">
                  <BsBuilding className="icon" />
                </div>
              </Col>
              <Col>
                <h1>{comData.get_companies.length}</h1>
                <p>Total Companies</p>
              </Col>
            </Row>
          )}
        </Col>
        <Col>
          {loadingDep ? (
            <Spin className="dash-loading" size="large" />
          ) : (
            <Row className="card card2" align="middle" gutter={20}>
              <Col>
                <div className="card-icon card-icon2">
                  <FaNetworkWired className="icon" />
                </div>
              </Col>
              <Col>
                <h1>{depData.get_departments.length}</h1>
                <p>Total Departments</p>
              </Col>
            </Row>
          )}
        </Col>
        <Col>
          {loadingOpp ? (
            <Spin className="dash-loading" size="large" />
          ) : (
            <Row className="card card3" align="middle" gutter={20}>
              <Col>
                <div className="card-icon card-icon3">
                  <GiBullseye className="icon" />
                </div>
              </Col>
              <Col>
                <h1>{OppData.get_opportunities.length}</h1>
                <p>Total Opportunities</p>
              </Col>
            </Row>
          )}
        </Col>
        <Col>
          {loadingMsg ? (
            <Spin className="dash-loading" size="large" />
          ) : (
            <Row className="card card4" align="middle" gutter={20}>
              <Col>
                <div className="card-icon card-icon4">
                  <GoMail className="icon" />
                </div>
              </Col>
              <Col>
                <h1>{MsgData.get_messages.length}</h1>
                <p>Total Messages</p>
              </Col>
            </Row>
          )}
        </Col>
        <Col>
          {loadingApp ? (
            <Spin className="dash-loading" size="large" />
          ) : (
            <Row className="card card5" align="middle" gutter={20}>
              <Col>
                <div className="card-icon card-icon5">
                  <FaRegIdBadge className="icon" />
                </div>
              </Col>
              <Col>
                <h1>{AppData.get_applications.length}</h1>
                <p>Total Applications</p>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Dashbord;
