import { Row, Col } from "antd";
import { useRouter } from "next/router";

// === graphql query ===
import { GET_COMPANY } from "../../graphql/query";
import { useQuery } from "@apollo/client";

import { Spin } from "antd";
import { FileExclamationOutlined } from "@ant-design/icons";

function CompanyDetail() {
  // ==== get company name from url ===
  const router = useRouter();
  const { companyDetail } = router.query;

  const { loading, data } = useQuery(GET_COMPANY, {
    variables: { name: companyDetail },
  });

  if (loading || !data) {
    return (
      <div>
        <center id="loading">
          <Spin size="large" />
        </center>
      </div>
    );
  }
  // if (!data.get_company) {
  //   return <h1>404 </h1>;
  // }
  const { name, id, logo, description, opportunities } = data.get_company;

  return (
    <div className="com-detail">
      <div className="container">
        <div>
          <Row align="middle" justify="space-between">
            <Col md={16} lg={14} xl={12} xxl={10} className="about-com">
              <h1>
                <span>&lt;</span>
                {name.toUpperCase()}
                <span>/&gt;</span>
              </h1>
              <p>JOIN OUR TEAM</p>
              <p>{description}</p>
              <div className="line"></div>
            </Col>
            <Col xs={0} sm={0} md={5} lg={6}>
              <img
                src={`http://localhost:5000/public/upload/images/${logo}`}
                alt={`${name} logo`}
              />
            </Col>
          </Row>
          <div className="our-team">
            <h2>
              <span>&lt; </span>
              OUR TEAM
              <span> /&gt;</span>
            </h2>
          </div>
        </div>

        <div className="job-list">
          {opportunities.length < 1 ? (
            <center style={{ color: "#c8c8c8" }}>
              <FileExclamationOutlined style={{ fontSize: "50px" }} />
              <p style={{ marginTop: "20px" }}>No data</p>
            </center>
          ) : (
            opportunities.map((res) => {
              const { id, position, status, companyName, department } = res;
              return status ? (
                <Row
                  key={id}
                  justify="space-between"
                  align="middle"
                  className="list"
                >
                  <Col>
                    <a href={`/open-opportunities/detail/${id}`}>
                      <h2>{position}</h2>
                    </a>
                    <p>{`${companyName} - ${department.name.toUpperCase()}`}</p>
                  </Col>
                  <Col>
                    <a
                      href={`/open-opportunities/detail/${id}`}
                      className="available"
                    >
                      Detail
                    </a>
                  </Col>
                </Row>
              ) : (
                <Row
                  key={id}
                  justify="space-between"
                  key={id}
                  align="middle"
                  className="list"
                  id="disable-list"
                >
                  <Col>
                    <h2 style={{ color: "#919090" }}>{position}</h2>

                    <p>{`${companyName}`}</p>
                  </Col>
                  <Col>
                    <a href="#" disabled className="close">
                      Close
                    </a>
                  </Col>
                </Row>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
export default CompanyDetail;
