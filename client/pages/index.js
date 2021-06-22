import React, { useState, useEffect } from "react";
import Link from "next/link";
//=== code spliting for performance ===
import loadable from "@loadable/component";
const Card = loadable(() => import("../comps/Card"));

import CardBox from "../comps/CardBox";

import { Row, Col, Spin, Button } from "antd";
import axios from "axios";
import MetaTags from "../comps/MetaTags";

// ==== json data ===
import smallworld from "../data/smallworld.json";

// Card for news
// CardBox for smallworld info
function Home() {
  const [community, setCommunity] = useState([]);
  const [koompi, setKoompi] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/koompi"
      )
      .then((res) => {
        setKoompi(res.data.items);
      });
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/smallworldvc"
      )
      .then((res) => {
        setCommunity(res.data.items);
      });
  }, []);
  return (
    <React.Fragment>
      <MetaTags
        title="Home"
        description="We began in 2011 by providing a collaborative workspace environment for entrepreneurs, and then quickly moved forward raising investment capital to fund new startup projects."
        canonical="https://smallworldventure.com/"
        thumbnail="https://smallworldventure.com/images/thumbnail/home.png"
      />
      <div className="home">
        <div className="big-header"></div>
        <div className="banner">
          <div className="container">
            <Row justify="space-between">
              <Col xs={24} sm={24} xl={14} xxl={10}>
                <Row gutter={[0, 20]}>
                  <Col>
                    <h1>
                      <span>&lt;</span>
                      Homegrown Startup Community
                      <span>/&gt;</span>
                    </h1>
                  </Col>
                  <Col>
                    <p>
                      We began in 2011 by providing a collaborative workspace
                      environment for entrepreneurs, and then quickly moved
                      forward raising investment capital to fund new startup
                      projects.
                    </p>
                  </Col>
                  <Col>
                    <p>
                      With a variety of research and development projects in
                      motion today, we're involved in startup venture building
                      through community supported seed equity investments,
                      together with rural ecovillage development and long-term
                      land management.
                    </p>
                  </Col>
                  <Col>
                    <a className="sw-default-btn load-more-btn" href="/about">
                      LEARN MORE
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col xs={0} sm={0} xl={8} xxl={0}>
                <img
                  width="370px"
                  height="400px"
                  className="space-ship"
                  src="/images/home/spaceship.png"
                  alt="space-ship image"
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="container ">
          <Row className="outter-card-box" gutter={[24, 24]}>
            {smallworld.map((res, i) => {
              const { title, des, img } = res;
              return (
                <Col key={i} md={12} xl={6}>
                  <CardBox title={title} des={des} src={img} />
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="idea-banner">
          <div className="container">
            <Row>
              <Col md={16} xl={13} xxl={12}>
                <h1>
                  <span>&lt;</span> Have some ideas for new venture?{" "}
                  <span>/&gt;</span>
                </h1>
                <p>
                  We're looking for new approaches to problem solving and
                  creating business.Do you have an innovative idea for a startup
                  venture?
                </p>
                <p>
                  Or maybe you have a skillset in mind that you want to develop
                  as you work within our existing SmallWorld venture.
                </p>
                <p>
                  We're open to discussing your own startup ideas, however
                  unconventional, regardless of age, gender, or nationality.
                </p>
                <p className="send-us-message">Send us a message!</p>
                <a href="/contact" className="sw-default-btn contact-us-btn">
                  CONTACT US
                </a>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container">
          <div className="news">
            <br />
            <h2>
              <span>&lt; </span>
              START-UP NEWS
              <span> /&gt;</span>
            </h2>
            <p className="p-description">
              Our ventures are working on exciting projects in various
              industries! Read our community news to stay updated on their
              initiatives and milestones!
            </p>
            <Row className="outter-card" gutter={[24, 24]}>
              {community.length === 0 ? (
                <div className="loading">
                  <Spin tip="Loading ..." />
                </div>
              ) : (
                community.slice(0, 4).map((community) => {
                  const { title, description, thumbnail, author, guid } =
                    community;
                  return (
                    <Col xs={24} sm={24} md={12} lg={8} xl={6} key={guid}>
                      <Card
                        title={title}
                        desc={description}
                        image={
                          thumbnail.match(/[^/]+(jpg|png|gif|jpeg)$/)
                            ? thumbnail
                            : null
                        }
                        author={author}
                      />
                    </Col>
                  );
                })
              )}
            </Row>
            <Link href="/news">
              <Button size="large" className="sw-default-btn">
                Load More
              </Button>
            </Link>
            <br />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
