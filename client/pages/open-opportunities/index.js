import { Row, Col } from "antd";
import Link from "next/link";
import MetaTags from "../../comps/MetaTags";
// import { useRouter } from "next/router";

//=== json data ====
import values from "../../data/open-page-data/values.json";
import departmentList from "../../data/open-page-data/departmentList.json";
import workWithUs from "../../data/open-page-data/workWithUs.json";
import recruiting from "../../data/open-page-data/recruiting.json";
import companies from "../../data/open-page-data/companies.json";

function index() {
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
                      Open-Opportunities
                      <span>/&gt;</span>
                    </h1>
                  </Col>
                  <Col>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In dictum suscipit quis lectus quam elementum volutpat. Ac
                      potenti ameutpat. Ac potenti amet, cras magna. Lacus amet
                      consectetur condimentum turpis sed sed at commodo.
                    </p>
                  </Col>
                  <Col>
                    <a
                      href="#openning"
                      className="sw-default-btn load-more-btn"
                    >
                      View Oppening
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col xs={0} sm={0} md={5}>
                <img
                  src="/images/open-opportunities/banner-image.svg"
                  alt="team work svg"
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="about-smallworld container">
          <h2>
            <span>&lt; </span>
            OUR VALUES
            <span> /&gt;</span>
          </h2>
          <Row gutter={[10, 5]}>
            {values.map((value, i) => (
              <Col key={i}>
                <p className="value">{value}</p>
              </Col>
            ))}
          </Row>
          <Row align="middle" justify="space-between">
            <Col md={13}>
              <h2>
                <span>&lt; </span>
                OUR GOAL AND VISION
                <span> /&gt;</span>
              </h2>
              <p>
                Our goal is to have fun, experiment, create, to do exceptional
                work, build the best products, give proper attention to detail,
                treat people right, tell the truth, never stop learning, and to
                have a positive impact on the future. We want to inspire you to
                do your best, dare you to achieve your dream, and encourage you
                to be yourself.
              </p>
            </Col>
            <Col className="goal-vision-img" xs={13} sm={10} md={7} xl={6}>
              <img
                src="/images/open-opportunities/goal-vision.svg"
                alt="smallworld's goal and vision"
              />
            </Col>
          </Row>
          <Row gutter={[30]}>
            <Col>
              <div className="employees-brands">
                <h1>100+</h1>
                <h1>Employees</h1>
              </div>
            </Col>
            <Col>
              <div className="employees-brands">
                <h1>11</h1>
                <h1>Brands</h1>
              </div>
            </Col>
          </Row>
          {/* ==== choose department ==== */}
          {/* id is for view openning button */}
          <h2 id="openning">
            <span>&lt; </span>
            CHOOSE YOUR DEPARTMENT
            <span> /&gt;</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem
            vitae, excepturi eum recusandae ut expedita blanditiis, quaerat
            architecto non molestias assumenda enim voluptatibus corrupti,
            numquam consequuntur dolorum deleniti at!
          </p>

          <Row align="middle" gutter={[20, 20]}>
            {departmentList.map((list) => {
              const { id, name, icon } = list;
              return (
                <Col key={list.id} xs={24} sm={24} md={12} xl={8}>
                  <a href={`open-opportunities/department/${id}`}>
                    <Row align="middle" className="departments">
                      <Col xs={3} sm={2} md={3}>
                        <img src={icon} alt={`${name} icon`} />
                      </Col>
                      <Col>
                        <h3>{name.toUpperCase()}</h3>
                      </Col>
                    </Row>
                  </a>
                </Col>
              );
            })}
          </Row>

          <h2 className="center">
            <span>&lt; </span>
            WORK WITH US
            <span> /&gt;</span>
          </h2>
          <Row gutter={[0, 30]}>
            {workWithUs.map((work) => (
              <Col key={work.id}>
                <Row
                  align="middle"
                  justify="space-around"
                  gutter={[0, 20]}
                  className="work-with-us"
                >
                  <Col xs={10} sm={9} md={{ span: 4, order: work.imgOrder }}>
                    <img src={work.img} alt="work with us" />
                  </Col>
                  <Col order={work.desOrder} sm={24} md={18}>
                    <h3>{work.title}</h3>
                    <p>{work.des}</p>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
          {/* === recruiting === */}
          <h2 className="center">
            <span>&lt; </span>
            RECRUITING TEAM MEMBER
            <span> /&gt;</span>
          </h2>
          <Row gutter={[40, 20]}>
            {recruiting.map((recruit, i) => (
              <Col key={i} lg={8}>
                <div className="recruit-card">
                  <p>
                    <span style={{ fontSize: "45px" }}>{`${i + 1}. `}</span>
                    {recruit}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
          {/* === choose company === */}
          <h2 className="center">
            <span>&lt; </span>
            CHOOSE YOUR COMPANY
            <span> /&gt;</span>
          </h2>
          <Row
            className="company"
            justify="center"
            align="middle"
            gutter={[0, 20]}
          >
            {companies.map((com, i) => (
              <Col key={i} xs={10} sm={7} md={6} lg={4}>
                <Link href={`/open-opportunities/${com.name.toLowerCase()}`}>
                  <div className="brand">
                    <img src={com.logo} alt={`${com.name} logo`} />
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default index;
