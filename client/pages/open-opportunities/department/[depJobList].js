import { useRouter } from "next/router";
import { Row, Col, Spin } from "antd";
// import PageNotFound from "../../404";

// === json data ===
import departmentList from "../../../data/open-page-data/departmentList.json";
// jobList = list of all opportunities
import jobList from "../../../data/open-page-data/jobList.json";

function JobListing() {
  // === get department id from url ===
  const { query } = useRouter();
  const depId = query.depJobList;

  //=== filter a department by url ===
  const department = departmentList.filter((dep) => dep.id === depId);

  // === list of opporunities from specific department ===
  const list = jobList.filter((job) => job.departmentId === depId);

  return (
    <div className="department-list">
      <div className="container">
        {list.length < 1 ? (
          <Row justify="center">
            <Col>
              <Spin tip="Loading..." size="large" />
            </Col>
          </Row>
        ) : (
          department.map((res) => {
            const { id, name } = res;
            return (
              <div key={id}>
                <h1>{name.toUpperCase()}</h1>
                <div className="line"></div>
                <div className="job-list">
                  {list.map((res) => {
                    const { id, company, position, status } = res;
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
                          <p>{`${company} - ${name.toUpperCase()}`}</p>
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
                          <p>{`${company} - ${name.toUpperCase()}`}</p>
                        </Col>
                        <Col>
                          <a href="#" disabled className="close">
                            Close
                          </a>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default JobListing;
