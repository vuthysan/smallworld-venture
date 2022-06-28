import { Row, Col } from "antd";
import MetaTags from "../comps/MetaTags";
import data from "../data/directors.json";
import partners from "../data/partners.json";
import startups from "../data/start-up.json";

function About() {
  return (
    <>
      <MetaTags
        title="About Us"
        description="Founded in 2011 as SmallWorld Cambodia, we created a shared
        professional workspace where progressive young business minds
        could explore and pursue their aspirations while transforming
        ideas into reality."
        canonical="https://smallworldventure.com/about"
        thumbnail="https://smallworldventure.com/images/thumbnail/about.png"
      />
      <div className="about">
        <Row className="about-info" align="middle" justify="space-between">
          <Col md={{ span: 24 }} lg={{ span: 11 }} span={{ xxl: 8 }}>
            <h1>
              <span>&lt;</span> What is SmallWorld? <span>/&gt;</span>
            </h1>
            <p>
              Founded in 2011 as SmallWorld Cambodia, we created a shared
              professional workspace where progressive young business minds
              could explore and pursue their aspirations while transforming
              ideas into reality.
            </p>
            <p>
              After five years of steady growth, SmallWorld Cambodia reorganized
              into SmallWorld Ventures to focus on venture building, information
              technologies, and the environment.
            </p>
            <p>
              Through equity investment partnerships, we're building a
              land-based technical, business, and academic community based on
              natural philosophy and ecologically sensitive practices.
            </p>
          </Col>
          <Col
            xs={{ span: 0 }}
            md={{ span: 0 }}
            lg={{ span: 12 }}
            span={{ xxl: 14 }}
            data-aos="fade-left"
          >
            <img src="/images/about/about-banner.png" alt="About" />
          </Col>
        </Row>
        {/* portfolios */}
        <div className="container">
          <Row
            className="portfolios"
            justify="center"
            align="middle"
            gutter={20}
          >
            <Col span={24} md={{ span: 10 }} data-aos="fade-right">
              <img src="/images/about/portfolios.png" alt="Portfolios" />
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <h2 className="about-title">
                <span>&lt;</span> Portfolios <span>/&gt;</span>
              </h2>
              <p>
                We began experimenting with equity investment partnerships in
                2013, and since then we've listed a few startup teams we're
                proud to be partnered with from their inception.
              </p>

              <Row justify="space-between" align="middle" gutter={[20, 20]}>
                {startups.map((startup, i) => {
                  return (
                    <Col key={i} span={7} data-aos="fade-left">
                      <a href={startup.url} target="_blank">
                        <img
                          loading="lazy"
                          src={`/images/about/${startup.logo}`}
                          alt={`${startup.name} logo`}
                        />
                      </a>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
        {/* board of director */}
        <div className="board-director">
          <div className="container">
            <h2 className="about-title">
              <span>&lt;</span> Board of Directors <span>/&gt;</span>
            </h2>
            <p>
              We're honored to have courageous and insightful business and
              community leaders to serve on our Board of Directors.
            </p>
            <div className="directors">
              {data.map((res) => {
                const { fullName, photo, id, position } = res;
                return (
                  <div key={id} className="directors-back" data-aos="fade-up">
                    <img src={photo} alt={fullName} />
                    <h3>{fullName}</h3>
                    <p>{position}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="partner">
            <h2 className="about-title">
              <span>&lt;</span> Strategic Partners <span>/&gt;</span>
            </h2>
            <p>
              We are especially pleased to have built strategic partnerships
              with forward-thinking leaders in the business world.
            </p>
            <div className="partner-container">
              <Row
                justify="center"
                gutter={{ xs: 10, sm: 10, md: 40 }}
                align="midle"
              >
                {partners.map((partner) => {
                  const { photo, name, id, url } = partner;
                  return (
                    <Col xs={8} sm={8} md={6} key={id} data-aos="fade-up">
                      <a href={url} target="_blank">
                        <img
                          src={photo}
                          alt={`${name} logo`}
                          className="img-responsive"
                        />
                      </a>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
