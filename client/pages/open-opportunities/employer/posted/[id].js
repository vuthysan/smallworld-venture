import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYER_POSTED_JOB } from "../../../../graphql/query";
import { Divider, Row, Col, Spin } from "antd";
import moment from "moment";
function posted() {
  const { id } = useRouter().query;

  //   === get employer posted job ===
  const { loading, data } = useQuery(GET_EMPLOYER_POSTED_JOB, {
    variables: { id },
  });

  if (loading) {
    return <Spin size="large" />;
  }
  const { get_employer } = data;

  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Posted Job</Divider>
      {get_employer.jobs.length < 1 ? (
        <center>No Data</center>
      ) : (
        <Row className="outter-card" gutter={[12, 12]}>
          {get_employer.jobs.map((res) => {
            const { company, id, createdAt, position } = res;
            return (
              <Col key={id} xs={24} sm={12} md={8}>
                <div className="card">
                  <p className="position">{position}</p>
                  <p className="company">{company.name}</p>
                  <p className="city">{`${company.city}, ${moment
                    .unix(createdAt / 1000)
                    .format("YYYY-MM-DD")}`}</p>
                  <button className="view-btn">
                    <a href={"/open-opportunities/employer/job/" + id}>
                      View Job
                    </a>
                  </button>
                  <button className="view-btn">
                    <a
                      href={"/open-opportunities/employer/job/applicants/" + id}
                    >
                      View Applicants
                    </a>
                  </button>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default posted;
