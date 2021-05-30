import React from "react";
import { GET_COMPANIES } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { Row, Col, Spin } from "antd";
function Companies() {
  const { loading: comLoading, data: comData } = useQuery(GET_COMPANIES);
  return (
    <React.Fragment>
      <h2 className="center">
        <span>&lt; </span>
        CHOOSE YOUR COMPANY
        <span> /&gt;</span>
      </h2>
      <Row className="company" justify="center" align="middle" gutter={[0, 20]}>
        {comLoading ? (
          <Spin size="large" />
        ) : (
          comData.get_companies.map((com) => {
            const { id, name, logo } = com;
            return (
              <Col key={id} xs={10} sm={7} md={6} lg={4}>
                <a href={`/open-opportunities/${name.toLowerCase()}`}>
                  <div className="brand">
                    <img
                      src={`http://localhost:5000/public/upload/images/${logo}`}
                      alt={`${name}'s logo`}
                    />
                  </div>
                </a>
              </Col>
            );
          })
        )}
      </Row>
    </React.Fragment>
  );
}

export default Companies;
