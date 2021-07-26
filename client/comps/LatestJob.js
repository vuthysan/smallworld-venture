import React from "react";
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../graphql/query";
import { Row, Col } from "antd";
import moment from "moment";

function LatestJob() {
  const { loading, data } = useQuery(GET_JOBS);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const { get_jobs } = data;

  return (
    <Row wrap={true} gutter={[0, 5]}>
      {get_jobs.map((res) => {
        const { id, position, company, createdAt } = res;
        return (
          <Col key={id} xs={24} sm={24} md={14}>
            <Row className="job-card" align="middle" justify="space-between">
              <Col>
                <a
                  href={`/open-opportunities/detail/${id}`}
                  className="position"
                >
                  {position}
                </a>
                <br />
                <a
                  href={`/open-opportunities/${company.name.toLowerCase()}`}
                  className="company"
                >
                  {company.name.toUpperCase()}
                </a>
                <br />
                <p className="city">{company.city}</p>
              </Col>
              <Col>
                <p className="date">
                  {moment.unix(createdAt / 1000).format("YYYY-MM-DD")}
                </p>
                <button className="apply-btn">
                  <a href="/open-opportunities/jobseeker/signin">Apply Now</a>
                </button>
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
}

export default LatestJob;
