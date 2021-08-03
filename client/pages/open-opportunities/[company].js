import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_COMPANY_BY_NAME } from "../../graphql/query";
import { Row, Col, Divider } from "antd";
import moment from "moment";

function Company() {
  const { company } = useRouter().query;

  const { loading, data } = useQuery(GET_COMPANY_BY_NAME, {
    variables: { name: company },
  });
  if (loading) return "";
  const { get_company } = data;
  // console.log(get_company);
  return (
    <>
      <div className="com-detail">
        {/* === top banner === */}
        <div className="com-banner">
          <div className="container">
            <Row justify="space-between" align="middle">
              <Col>
                <h1>{get_company.name}</h1>
                <p className="city">{get_company.city}</p>
              </Col>
              <Col>
                <img
                  // width="200"
                  height="90"
                  src={
                    "http://localhost:5000/public/upload/images/" +
                    get_company.logo
                  }
                  alt="logo of company"
                />
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col md={10}>
                <p>{get_company.about}</p>
              </Col>
              <Col>
                <p className="job-count">{get_company.jobs.length}</p>
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
          <a>{get_company.website}</a>
          {/* === contact === */}
          <h2>Contact Information</h2>
          <Row align="middle" gutter={60}>
            <Col>
              <p>{get_company.employer.name}</p>
              <p className="recru-position">{get_company.employer_position}</p>
            </Col>
            <Divider type="vertical" style={{ height: "70px" }} />
            <Col>
              <div className="contact-info">
                <img
                  src="/images/open-opportunities/call.svg"
                  alt="call icon"
                  className="svg"
                />
                <p>{get_company.employer.phone}</p>
              </div>
              <div className="contact-info">
                <img
                  src="/images/open-opportunities/mail.svg"
                  alt="call icon"
                  className="svg"
                />
                <p>{get_company.employer.email}</p>
              </div>
            </Col>
          </Row>
          {/* === job available === */}
          <h2>Company Job Available</h2>
          <Row gutter={[0, 5]}>
            {get_company.jobs.map((res) => {
              const { id, position, createdAt } = res;
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
                      <a href="#" className="company">
                        {get_company.name.toUpperCase()}
                      </a>
                      <br />
                      <p className="city">{get_company.city}</p>
                    </Col>
                    <Col>
                      <p className="date">
                        {" "}
                        {moment
                          .unix(get_company.createdAt / 1000)
                          .format("YYYY-MM-DD")}
                      </p>
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
    </>
  );
}

export default Company;
