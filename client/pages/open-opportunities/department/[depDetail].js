import { useRouter } from "next/router";
import { Row, Col, Spin } from "antd";
// === graphql query ===
import { GET_DEPARTMENT } from "../../../graphql/query";
import { useQuery } from "@apollo/client";
import { FileExclamationOutlined } from "@ant-design/icons";

function JobListing() {
  const router = useRouter();
  const { depDetail } = router.query;

  // console.log(depDetail);

  // === get department id from url ===
  const { loading, data } = useQuery(GET_DEPARTMENT, {
    variables: { id: depDetail },
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

  // console.log(data);
  const { name, opportunities } = data.get_department;

  return (
    <div className="department-list">
      <div className="container">
        <div>
          <h1>{name.toUpperCase()}</h1>
          <div className="line"></div>
          <div className="job-list">
            {opportunities.length < 1 ? (
              <center style={{ color: "#c8c8c8" }}>
                <FileExclamationOutlined style={{ fontSize: "50px" }} />
                <p style={{ marginTop: "20px" }}>No data</p>
              </center>
            ) : (
              opportunities.map((opp) => {
                const { id, position, status, companyName } = opp;
                return status ? (
                  <Row
                    justify="space-between"
                    key={id}
                    align="middle"
                    className="list"
                  >
                    <Col>
                      <a href={`/open-opportunities/detail/${id}`}>
                        <h2>{position}</h2>
                      </a>

                      {/* === name is department name === */}
                      <p>{`${companyName} - ${data.get_department.name.toUpperCase()}`}</p>
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
                    justify="space-between"
                    key={id}
                    align="middle"
                    className="list"
                    id="disable-list"
                  >
                    <Col>
                      <h2 style={{ color: "#919090" }}>{position}</h2>

                      {/* === name is department name === */}
                      <p>{`${companyName} - ${data.get_department.name.toUpperCase()}`}</p>
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
    </div>
  );
}

export default JobListing;
