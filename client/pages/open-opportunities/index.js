import MetaTags from "../../comps/MetaTags";
import { Row, Col, Dropdown, Button, Menu } from "antd";

function index() {
  // === Job seeker menu ===
  const JobSeekerMenu = (
    <Menu>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="/open-opportunities/jobseeker/signin"
        >
          Job Seeker
        </a>
      </Menu.Item>

      <Menu.Item>
        <a rel="noopener noreferrer" href="/open-opportunities/employer/signin">
          Employer
        </a>
      </Menu.Item>
    </Menu>
  );

  // === Emlployer Menu menu ===
  const EmployerMenu = (
    <Menu>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="/open-opportunities/jobseeker/signup"
        >
          Job Seeker
        </a>
      </Menu.Item>

      <Menu.Item>
        <a rel="noopener noreferrer" href="/open-opportunities/employer/signup">
          Employer
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <MetaTags
        title="Open-Opportunities"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dictum suscipit quis lectus quam elementum volutpat. Ac potenti ameutpat. Ac potenti amet, cras magna. Lacus amet consectetur condimentum turpis sed sed at commodo."
        canonical="https://smallworldventure.com/open-opportunities"
        thumbnail="https://smallworldventure.com/images/thumbnail/about.png"
      />
      <div className="open">
        {/*  === header ===  */}
        <div className="open-banner">
          <div className="container">
            <Row align="middle" justify="space-between">
              <Col md={15} lg={14} xl={10}>
                <Row gutter={[0, 20]}>
                  <Col>
                    <h1>
                      <span>&lt;</span>
                      OPEN-OPPORTUNITIES
                      <span>/&gt;</span>
                    </h1>
                  </Col>
                  <Col>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In dictum suscipit quis lectus quam elementum volutpat. Ac
                      potenti ameutpat. Ac potenti amet, cras magna.
                    </p>
                  </Col>
                  <Col>
                    <Dropdown
                      overlay={JobSeekerMenu}
                      placement="bottomCenter"
                      trigger="click"
                      arrow
                    >
                      <Button className="opportunities-btn">Sign In</Button>
                    </Dropdown>
                    <Dropdown
                      overlay={EmployerMenu}
                      placement="bottomCenter"
                      arrow
                      trigger="click"
                    >
                      <Button className="opportunities-btn">Sign Up</Button>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
              <Col xs={0} sm={0} md={6}>
                <img
                  src="/images/open-opportunities/resume.svg"
                  alt="team work svg"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
