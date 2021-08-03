import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYER_COMPANIES } from "../../../../graphql/query";
import { Divider, Row, Col } from "antd";
import moment from "moment";
function companies() {
  const { id } = useRouter().query;
  //   console.log(id);
  //   === get employer by id ===
  const { loading, data } = useQuery(GET_EMPLOYER_COMPANIES, {
    variables: { id },
  });

  if (loading) return "";
  const { get_employer } = data;

  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Companies</Divider>
      <Row className="outter-card" gutter={[12, 12]}>
        {get_employer.companies.map((res) => {
          const { id, name, createdAt, city, logo } = res;
          return (
            <Col key={id} md={8}>
              <div className="com-card">
                <div className="img">
                  <img
                    height="60"
                    src={"http://localhost:5000/public/upload/images/" + logo}
                    alt="company logo"
                  />
                </div>
                <p>
                  <span className="content"> Company Name:</span>
                  {name.toUpperCase()}
                </p>
                <p>
                  <span className="content"> Company City:</span>
                  {city}
                </p>
                <p>
                  <span className="content"> Added Date:</span>
                  {moment.unix(createdAt / 1000).format("YYYY-MM-DD")}
                </p>
                <button className="view-btn">
                  <a href={"/open-opportunities/employer/company/" + id}>
                    View Company
                  </a>
                </button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default companies;
