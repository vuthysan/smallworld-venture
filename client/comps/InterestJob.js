import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_JOBS, GET_JOBSEEKER } from "../graphql/query";
import UserContext from "../context/userContext";
import { Row, Col, Pagination, Spin } from "antd";

// === json data ===
// import jobs from "../data/jobs.json";

function InterestJob() {
  const { user } = useContext(UserContext);

  const { loading: seekerLoading, data: seekerData } = useQuery(GET_JOBSEEKER, {
    variables: { id: user && user.id },
  });
  const { loading, data } = useQuery(GET_JOBS);

  if (loading || seekerLoading) {
    return <Spin size="large" className="loading-data" />;
  }

  // const [posts, setPosts] = useState([]);
  // const [current, setCurrent] = useState(1);
  // const [postsPerPage] = useState(10);

  // const onChange = (page) => {
  //   setCurrent(page);
  // };

  // === get curent post ===
  // const indexOfLastPost = current * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Row wrap={true} gutter={[0, 5]}>
        {user && user.role === "jobseeker" ? (
          data.get_jobs.map((res) => {
            const { type, position, company, createdAt, id } = res;
            let match = false;
            type.forEach((t) => {
              seekerData.get_jobseeker.interest.forEach((j) => {
                if (j === t) {
                  match = true;
                }
              });
            });
            if (match) {
              return (
                <Col key={id} xs={24} sm={24} md={14}>
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
                      <p className="date">{createdAt}</p>
                      <button className="apply-btn">
                        <a href="/open-opportunities/jobseeker/signin">
                          Apply Now
                        </a>
                      </button>
                    </Col>
                  </Row>
                </Col>
              );
            } else return "";
          })
        ) : (
          <h2>Signup as Jobseeker first</h2>
        )}
      </Row>
      {/* <Pagination onChange={onChange} total={100} /> */}
    </>
    // <Row wrap={true} gutter={[0, 5]}>
    //   {jobs.map((res) => {
    //     const { id, position, companyName, city, createdAt } = res;
    //     return (
    //       <Col key={id} xs={24} sm={24} md={14}>
    //         <Row className="job-card" align="middle" justify="space-between">
    //           <Col>
    //             <a
    //               href={`/open-opportunities/detail/${id}`}
    //               className="position"
    //             >
    //               {position}
    //             </a>
    //             <br />
    //             <a
    //               href={`/open-opportunities/${companyName.toLowerCase()}`}
    //               className="company"
    //             >
    //               {companyName}
    //             </a>
    //             <br />
    //             <p className="city">{city}</p>
    //           </Col>
    //           <Col>
    //             <p className="date">{createdAt}</p>
    //             <button className="apply-btn">
    //               <a href="/open-opportunities/jobseeker/signin">Apply Now</a>
    //             </button>
    //           </Col>
    //         </Row>
    //       </Col>
    //     );
    //   })}
    // </Row>
  );
}

export default InterestJob;
