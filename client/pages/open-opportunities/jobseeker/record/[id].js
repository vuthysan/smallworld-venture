import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_JOBSEEKER_APPLICATIONS } from "../../../../graphql/query";
import { Divider, Row, Col } from "antd";
import moment from "moment";
function Record() {
  const { id: jobseekerId } = useRouter().query;

  // === get job seeker applications by id ===
  const { loading, data } = useQuery(GET_JOBSEEKER_APPLICATIONS, {
    variables: { jobseekerId },
  });
  if (loading) return "";

  const { get_jobseeker_applications } = data;

  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Applications Record</Divider>
      <Row className="outter-card" gutter={[12, 12]}>
        {get_jobseeker_applications.map((res) => {
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
    </div>
  );
}

export default Record;
