import React, { useState, useEffect } from "react";
import Card from "../comps/Card";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import MetaTags from "../comps/MetaTags";

axios.defaults.withCredentials = true;

function News() {
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags
        title="News"
        description="Our ventures are working on exciting projects in various industries! Read our community news to stay updated on their initiatives and milestones!"
        canonical="https://smallworldventure.com/news"
        thumbnail="https://smallworldventure.com/images/thumbnail/news.png"
      />
      <div className="container">
        <div className="news">
          <h2 className="about-title">
            <span>&lt;</span> START-UP NEWS <span>/&gt;</span>
          </h2>
          <p className="p-description">
            Our ventures are working on exciting projects in various industries!
            Read our community news to stay updated on their initiatives and
            milestones!
          </p>
          <Row className="outter-card" gutter={[24, 24]}>
            {community.length === 0 ? (
              <div className="loading">
                <Spin tip="Loading ..." />
              </div>
            ) : (
              community.map((community) => {
                const { title, description, thumbnail, author, guid } =
                  community;
                return (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={6}
                    key={guid}
                    data-aos="fade-right"
                  >
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
        </div>
      </div>
    </>
  );
}

export default News;
