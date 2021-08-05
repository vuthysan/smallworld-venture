import React, { useContext } from "react";
import UserContext from "../../../context/userContext";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_JOB } from "../../../graphql/query";
import { Row, Col, Divider, Spin, message } from "antd";
import moment from "moment";
function Position() {
  const { id } = useRouter().query;
  const { user } = useContext(UserContext);

  // === get job detail by job id ===
  const { loading, data } = useQuery(GET_JOB, { variables: { id } });
  if (loading) {
    return (
      <center>
        <Spin size="large" />
      </center>
    );
  }
  const { get_job } = data;

  return (
    <div className="position-detail">
      <div className="container">
        <div key={id}>
          <Row justify="space-between" align="middle">
            <Col>
              <h1>{get_job.position}</h1>
              <a
                href={`/open-opportunities/${get_job.company.name.toLowerCase()}`}
              >
                {get_job.company.name.toUpperCase()}
              </a>
              <p className="salary">{`Salary: ${get_job.salary}`}</p>
            </Col>
            <Col>
              <p>{`Posted Date: ${moment
                .unix(get_job.createdAt / 1000)
                .format("MMMM-DD-YYYY")}`}</p>
              <button className="apply-btn">
                {user && user.role === "jobseeker" ? (
                  <a href={"/open-opportunities/apply/" + get_job.id}>
                    Apply Now
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={() => {
                      message.warn(
                        "Please signin / register as jobseeker to apply for jobs!"
                      );
                    }}
                  >
                    Apply Now
                  </a>
                )}
              </button>
            </Col>
          </Row>
          <h3>Requirements</h3>
          <ul>
            {get_job.requirements.map((res, i) => {
              return <li key={i}>{res}</li>;
            })}
          </ul>
          <h3>Descriptions</h3>
          <ul>
            {get_job.descriptions.map((res, i) => {
              return <li key={i}>{res}</li>;
            })}
          </ul>
          <h3>About Company</h3>
          <div>
            <p>{get_job.company.about}</p>
            <h3>Contact Information</h3>
            <Row align="middle" gutter={60}>
              <Col>
                <p>{get_job.employer.name.toUpperCase()}</p>
                <p className="recru-position">
                  {get_job.company.employer_position}
                </p>
              </Col>
              <Divider type="vertical" style={{ height: "70px" }} />
              <Col>
                <div className="contact-info">
                  <img
                    src="/images/open-opportunities/call.svg"
                    alt="call icon"
                    className="svg"
                  />
                  <p>{get_job.employer.phone}</p>
                </div>
                <div className="contact-info">
                  <img
                    src="/images/open-opportunities/mail.svg"
                    alt="call icon"
                    className="svg"
                  />
                  <p>{get_job.employer.email}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Position;
