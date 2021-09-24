import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import { useQuery } from "@apollo/client";
import { GET_USER_APPLICATIONS } from "../../graphql/query";
import { Divider, Row, Col, Spin, Empty } from "antd";
import moment from "moment";
function Record() {
  const { user } = useContext(UserContext);

  // === get job seeker applications by id ===
  const { loading, data } = useQuery(GET_USER_APPLICATIONS, {
    variables: { userId: user && user.id },
  });

  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Applications Record</Divider>
      {data && data.get_user_applications.length < 1 ? (
        <center className="no-data">
          <Empty />
        </center>
      ) : (
        <Row className="outter-card" gutter={[12, 12]}>
          {data &&
            data.get_user_applications.map((res) => {
              const { id, createdAt, job } = res;
              return (
                <Col xs={24} sm={12} md={8} key={id}>
                  <div className="card">
                    <p className="position">{job.position}</p>
                    <p className="company">{job.company.name.toUpperCase()}</p>
                    <p className="city">{`${job.company.city} - ${moment
                      .unix(job.createdAt / 1000)
                      .format("YYYY-MM-DD")}`}</p>
                    <button className="view-btn">{`Applied Date: ${moment
                      .unix(createdAt / 1000)
                      .format("YYYY-MM-DD")}`}</button>
                  </div>
                </Col>
              );
            })}
        </Row>
      )}
    </div>
  );
}

export default Record;
