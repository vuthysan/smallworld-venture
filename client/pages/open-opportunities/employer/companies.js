import React, { useContext } from "react";
import UserContext from "../../../context/userContext";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYER_COMPANIES } from "../../../graphql/query";
import { Divider, Row, Col } from "antd";
function companies() {
  const { user } = useContext(UserContext);
  // console.log(user);
  // === get employer by id ===
  const { loading, data } = useQuery(GET_EMPLOYER_COMPANIES, {
    variables: { id: user && user.id },
  });
  if (loading) return "";
  const { get_employer } = data;
  console.log(get_employer);
  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Companies</Divider>
      <Row className="outter-card" gutter={[12, 12]}>
        <Col md={8}>
          <div className="com-card">
            <div className="img">
              <img height="60" src="/images/testcom.png" alt="company logo" />
            </div>
            <p>
              <span className="content"> Company Name:</span>Koompi
            </p>
            <p>
              <span className="content"> Company City:</span>Phnom Penh
            </p>
            <p>
              <span className="content"> About Company:</span>Koompi, together
              with KOOMPI OS, are...
            </p>
            <button className="view-btn">
              <a href={"/open-opportunities/employer/company/" + 1}>
                View Company
              </a>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default companies;
