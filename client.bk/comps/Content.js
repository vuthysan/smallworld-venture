import { Row, Col } from "antd";

// In content props array have [title,des,img,desOrder,imgOrder]
function Content({ content }) {
  return (
    <div className="works-content">
      <Row align="middle" justify="space-between">
        <Col
          sm={{ span: 24, order: 1 }}
          md={{ span: 12, order: content.desOrder }}
        >
          {content.title.length > 1 ? (
            content.title.map((title, i) => (
              <div key={i}>
                <h2 className="about-title-content">
                  <span>&lt;</span> {title} <span>/&gt;</span>
                </h2>
                {content.des[i].split(".").map((des, n) => (
                  <p key={n}>
                    {n === content.des[i].split(".").length - 1
                      ? ""
                      : des + "."}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <>
              <h2 className="about-title-content">
                <span>&lt;</span> {content.title} <span>/&gt;</span>
              </h2>
              {content.des.split(".").map((des, i) => (
                <p key={i}>
                  {i === content.des.split(".").length - 1 ? "" : des + "."}
                </p>
              ))}
            </>
          )}
        </Col>
        <Col
          sm={{ span: 24, order: 2 }}
          md={{ span: 10, order: content.imgOrder }}
        >
          <div className="content-img-wrapper" data-aos="fade-left">
            <img loading="lazy" src={content.img} alt={content.title} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Content;
