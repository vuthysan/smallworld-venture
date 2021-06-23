import React from "react";
import { useRouter } from "next/router";
import { Row, Col, Divider } from "antd";

// === json data ===
import jobs from "../../../data/jobs.json";
import companies from "../../../data/companies.json";

function Position() {
  const { position } = useRouter().query;

  const job = jobs.filter((res) => res.id === position);
  return (
    <div className="position-detail">
      <div className="container">
        {job.map((res) => {
          const {
            id,
            position: name,
            companyName,
            createdAt,
            salary,
            req,
            des,
          } = res;
          return (
            <div key={id}>
              <Row justify="space-between" align="middle">
                <Col>
                  <h1>{name}</h1>
                  <a href={`/open-opportunities/${companyName.toLowerCase()}`}>
                    {companyName}
                  </a>
                  <p className="salary">{`Salary: ${salary}`}</p>
                </Col>
                <Col>
                  <p>{`Posted Date: ${createdAt}`}</p>
                  <button className="apply-btn">
                    <a href="/open-opportunities/jobseeker/signin">Apply Now</a>
                  </button>
                </Col>
              </Row>
              <h3>Requirements</h3>
              <ul>
                {req.map((res, i) => {
                  return <li key={i}>{res}</li>;
                })}
              </ul>
              <h3>Descriptions</h3>
              <ul>
                {des.map((res, i) => {
                  return <li key={i}>{res}</li>;
                })}
              </ul>
              <h3>About Company</h3>
              {companies.map((res, i) => {
                const {
                  about,
                  recruiter,
                  recruiterPosition: pos,
                  phone,
                  email,
                } = res;
                return (
                  <div key={i}>
                    <p>{about}</p>
                    <h3>Contact Information</h3>
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
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Position;
