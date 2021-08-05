import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../graphql/query";
import { Row, Col, Pagination } from "antd";
import moment from "moment";

function LatestJob() {
  const [current, setCurrent] = useState(1);
  const [postsPerPage] = useState(2);
  const { loading, data } = useQuery(GET_JOBS);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const { get_jobs } = data;
  console.log(get_jobs.length);
  const onChange = (page) => {
    setCurrent(page);
  };
  // === get curent post ===
  const indexOfLastPost = current * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentJobs =
    get_jobs && get_jobs.slice(indexOfFirstPost, indexOfLastPost);

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
      <Pagination onChange={onChange} pageSize={postsPerPage} total={3} />
    </>
  );
}

export default LatestJob;
