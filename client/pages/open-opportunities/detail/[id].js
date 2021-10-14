import React, { useContext } from "react";
// import UserContext from "../../../context/userContext";
import AuthContext from "../../../context/auth";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_JOB, GET_USER } from "../../../graphql/query";
import { Row, Col, Divider, Spin, message } from "antd";
import moment from "moment";
function Position() {
  const { id } = useRouter().query;
  // const { user } = useContext(UserContext);
  const { token } = useContext(AuthContext);

  // === get job detail by job id ===
  const { loading, data } = useQuery(GET_JOB, { variables: { id } });
  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  if (loading || userLoading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  return (
    <div className="position-detail">
      <div className="container">
        {data && (
          <div key={id}>
            <Row justify="space-between" align="middle">
              <Col>
                <h1>{data.get_job.position.toUpperCase()}</h1>
                <a
                  href={`/open-opportunities/${data.get_job.company.name.toLowerCase()}`}
                >
                  {data.get_job.company.name.toUpperCase()}
                </a>
                <p className="salary">{`Salary: ${data.get_job.salary}`}</p>
              </Col>
              <Col>
                <p>{`Posted Date: ${moment
                  .unix(data.get_job.createdAt / 1000)
                  .format("MMMM-DD-YYYY")}`}</p>
                <button className="apply-btn">
                  {token !== "" &&
                  userData.get_user.userId !== data.get_job.user.userId ? (
                    <a href={"/open-opportunities/apply/" + data.get_job.id}>
                      Apply Now
                    </a>
                  ) : token !== "" &&
                    data.get_job.user.userId == userData.get_user.userId ? (
                    <a
                      href="#"
                      onClick={() => {
                        message.warn("You can not apply your own posted job!");
                      }}
                    >
                      Apply Now
                    </a>
                  ) : (
                    <a
                      href="#"
                      onClick={() => {
                        message.warn("Please login or register before apply!");
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
              {data.get_job.requirements.map((res, i) => {
                return <li key={i}>{res}</li>;
              })}
            </ul>
            <h3>Descriptions</h3>
            <ul>
              {data.get_job.descriptions.map((res, i) => {
                return <li key={i}>{res}</li>;
              })}
            </ul>
            <h3>About Company</h3>
            <div>
              <p>{data.get_job.company.about}</p>
              <h3>Contact Information</h3>
              <Row align="middle" gutter={60}>
                <Col>
                  <p>{data.get_job.user.name.toUpperCase()}</p>
                  <p className="recru-position">
                    {data.get_job.company.user_position}
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
                    <p>{data.get_job.user.phone}</p>
                  </div>
                  <div className="contact-info">
                    <img
                      src="/images/open-opportunities/mail.svg"
                      alt="call icon"
                      className="svg"
                    />
                    <p>{data.get_job.user.email}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Position;
