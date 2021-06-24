import React from "react";
import { useRouter } from "next/router";
import { Row, Col, Divider } from "antd";
// == json data ==
import companies from "../../data/companies.json";
import jobs from "../../data/jobs.json";

function Company() {
  const { company } = useRouter().query;

  let com = companies.filter((res) => res.name.toLowerCase() === company);
  let comJob = jobs.filter((res) => res.companyName.toLowerCase() === company);

  return (
    <>
      {com.map((res, i) => {
        const {
          name,
          recruiter,
          city,
          logo,
          recruiterPosition: pos,
          about,
          phone,
          email,
          website,
        } = res;
        return (
          <div key={i} className="com-detail">
            {/* === top banner === */}
            <div className="com-banner">
              <div className="container">
                <Row justify="space-between" align="middle">
                  <Col>
                    <h1>{name}</h1>
                    <p className="city">{city}</p>
                  </Col>
                  <Col>
                    <img width="200" src={logo} alt="koompi logo" />
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col md={10}>
                    <p>{about}</p>
                  </Col>
                  <Col>
                    <p className="job-count">{comJob.length}</p>
                    <p>Jobs Available</p>
                  </Col>
                </Row>
                <div className="line"></div>
              </div>
            </div>
            {/* === end top banner === */}
            {/* === webste === */}
            <div className="container">
              <h2>Website</h2>
              <a>{website}</a>
              {/* === contact === */}
              <h2>Contact Information</h2>
              <Row align="middle" gutter={60}>
                <Col>
                  <p>{recruiter}</p>
                  <p className="recru-position">{pos}</p>
                </Col>
                <Divider type="vertical" style={{ height: "70px" }} />
                <Col>
                  <div className="contact-info">
                    <img
                      src="/images/open-opportunities/call.svg"
                      alt="call icon"
                      className="svg"
                    />
                    <p>{phone}</p>
                  </div>
                  <div className="contact-info">
                    <img
                      src="/images/open-opportunities/mail.svg"
                      alt="call icon"
                      className="svg"
                    />
                    <p>{email}</p>
                  </div>
                </Col>
              </Row>
              {/* === job available === */}
              <h2>Company Job Available</h2>
              <Row gutter={[0, 5]}>
                {comJob.map((res) => {
                  const { id, position, companyName, city, createdAt } = res;
                  return (
                    <Col key={id} md={14}>
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
                          <a href="#" className="company">
                            {companyName}
                          </a>
                          <br />
                          <p className="city">{city}</p>
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
                })}
              </Row>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Company;
