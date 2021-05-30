import React from "react";
import { GET_DEPARTMENTS } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { Spin, Row, Col } from "antd";
function Departments() {
  const { loading: depLoading, data: depData } = useQuery(GET_DEPARTMENTS);
  return (
    <React.Fragment>
      {/* id is for view openning button */}
      <h2 id="openning">
        <span>&lt; </span>
        CHOOSE YOUR DEPARTMENT
        <span> /&gt;</span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem
        vitae, excepturi eum recusandae ut expedita blanditiis, quaerat
        architecto non molestias assumenda enim voluptatibus corrupti, numquam
        consequuntur dolorum deleniti at!
      </p>

      <Row align="middle" gutter={[20, 20]}>
        {depLoading ? (
          <Spin szie="large" />
        ) : (
          depData.get_departments.map((dep) => {
            const { name, icon, id } = dep;
            return (
              <Col key={id} xs={24} sm={24} md={12} xl={8}>
                <a href={`open-opportunities/department/${id}`}>
                  <Row align="middle" className="departments">
                    <Col xs={3} sm={2} md={3}>
                      <img
                        src={`http://localhost:5000/public/upload/images/${icon}`}
                        alt={`${name} icon`}
                      />
                    </Col>
                    <Col>
                      <h3>{name.toUpperCase()}</h3>
                    </Col>
                  </Row>
                </a>
              </Col>
            );
          })
        )}
      </Row>
    </React.Fragment>
  );
}

export default Departments;
