import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_JOBS, GET_USER } from "../graphql/query";
import AuthContext from "../context/auth";
import { Row, Col, Pagination, Spin, Empty } from "antd";
import moment from "moment";

function InterestJob() {
  const [current, setCurrent] = useState(1);
  const [jobsPerPage] = useState(10);

  const { token } = useContext(AuthContext);

  // === get jobseeker info(interest) ===
  const { loading: seekerLoading, data: seekerData } = useQuery(GET_USER);

  // === get all jobs ===
  const { loading, data } = useQuery(GET_JOBS);

  if (loading || seekerLoading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  // === filter jobs for jobseeker's interest only ===
  let interestJobs;
  if (token !== "") {
    interestJobs =
      data &&
      data.get_jobs.filter((res) => {
        const { type } = res;
        let match = false;
        type.forEach((t) => {
          seekerData.get_user.interest.forEach((j) => {
            if (t === j) {
              match = true;
            }
          });
        });
        if (match) {
          return res;
        }
      });
  }
  console.log(interestJobs);

  // === get curent jobs depend on jobsPerPage ===
  const indexOfLastPost = current * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentJobs =
    interestJobs && interestJobs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Row wrap={true} gutter={[0, 5]}>
        {token !== "" ? (
          currentJobs.length > 0 ? (
            currentJobs.map((res) => {
              const { position, company, createdAt, id } = res;
              return (
                <Col key={id} xs={24} sm={24} md={14} lg={13}>
                  <Row
                    className="job-card"
                    align="middle"
                    justify="space-between"
                  >
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
                        {company.name}
                      </a>
                      <br />
                      <p className="city">{company.city}</p>
                    </Col>
                    <Col>
                      <p className="date">
                        {" "}
                        {moment.unix(createdAt / 1000).format("YYYY-MM-DD")}
                      </p>
                      <button className="apply-btn">
                        <a href={`/open-opportunities/detail/${id}`}>
                          Apply Now
                        </a>
                      </button>
                    </Col>
                  </Row>
                </Col>
              );
            })
          ) : (
            <div className="no-data">
              <Empty description="No data matches your interest!" />
            </div>
          )
        ) : (
          <>
            <div className="no-data">
              <Empty
                description={
                  <p>
                    Please <a href="/open-opportunities/signin">sign in</a> /{" "}
                    <a href="open-opportunities/signup">register</a> to view
                    your interest jobs!
                  </p>
                }
              />
            </div>
          </>
        )}
      </Row>

      {token !== "" && interestJobs.length > 0 ? (
        <Pagination
          onChange={(page) => setCurrent(page)}
          size="small"
          pageSize={jobsPerPage}
          total={interestJobs.length}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default InterestJob;
