import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/userContext";
import { Row, Col, Pagination } from "antd";

// === json data ===
// import jobs from "../data/jobs.json";

function InterestJob() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=99 ")
      .then((res) => setPosts(res.data));
  }, []);

  const onChange = (page) => {
    setCurrent(page);
  };

  // === get curent post ===
  const indexOfLastPost = current * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
  return (
    <>
      <h1>Interest Job</h1>
      {currentPosts.map((res) => {
        const { id, title } = res;
        return (
          <div style={{ background: "yellow", margin: "10px 0" }}>
            <h2>{title}</h2>
            <p>{id}</p>
          </div>
        );
      })}
      <Pagination onChange={onChange} total={100} />
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
