import React, { useState } from "react";
import { Row, Col, Pagination } from "antd";
import moment from "moment";

function SearchJob({ jobs }) {
  const [current, setCurrent] = useState(1);
  const [jobsPerPage] = useState(2);
  const onChange = (page) => {
    setCurrent(page);
  };

  // === get curent jobs ===
  const indexOfLastPost = current * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastPost);

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
        pageSize={jobsPerPage}
        total={jobs.length}
      />
    </>
  );
}

export default SearchJob;
