import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../graphql/query";
import { Row, Col, Pagination, Spin } from "antd";
import moment from "moment";

function LatestJob() {
  const [current, setCurrent] = useState(1);
  const [jobsPerPage] = useState(10);

  const { loading, data } = useQuery(GET_JOBS);

  if (loading) {
    return (
      <div className="loading-data">
        <Spin size="large" />
      </div>
    );
  }

  const onChange = (page) => {
    setCurrent(page);
  };

  // === get curent jobs depend on jobs/page ===
  const indexOfLastPost = current * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentJobs =
    data.get_jobs && data.get_jobs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Row wrap={true} gutter={[0, 5]}>
        {currentJobs.map((res) => {
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
                    <a href={`/open-opportunities/detail/${id}`}>Apply Now</a>
                  </button>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
      <Pagination
        onChange={onChange}
        size="small"
        pageSize={jobsPerPage}
        total={data.get_jobs.length}
      />
    </>
  );
}

export default LatestJob;
