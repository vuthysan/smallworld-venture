import { Row, Col, Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaTelegramPlane, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import MetaTags from "../comps/MetaTags";

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const onFinish = async (values) => {
    await axios
      .post("http://localhost:4405/api/form", { ...values })
      .then(() => {
        setIsLoading(true);
        notification["success"]({
          message: "Success",
          description: "Thank you for reaching out. Please check your email.",
        });
        setIsLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <MetaTags
        title="Contact"
        description="We look forward to assisting you at any working hour. There are several startups in the same building, so you just have to know who you are looking for."
        canonical="https://smallworldventure.com/contact"
        thumbnail="https://smallworldventure.com/images/thumbnail/contact.png"
      />

      <div className="container">
        <div className="contact-page">
          <Row gutter={50}>
            <Col xs={24} sm={24} md={12}>
              <h2>Inquiries Request</h2>
              <Form
                {...layout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="fullname"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input your fullname!" },
                  ]}
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    { type: "email", message: "The email is not valid!" },
                  ]}
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    {
                      required: true,
                      message: "Please input your message!",
                    },
                    {
                      min: 50,
                      message: "Make sure your message more than 50 characters",
                    },
                  ]}
                >
                  <Input.TextArea disabled={true} />
                </Form.Item>
                <Form.Item>
                  <br />
                  <Button
                    className="sw-default-btn"
                    htmlType="submit"
                    style={{ padding: "20px 60px" }}
                    loading={isLoading ? true : false}
                    disabled={true}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col className="office-info" xs={24} sm={24} md={12}>
              <h2>Our Office</h2>
              <div className="contact-icons">
                <div>
                  <FaMapMarkerAlt />
                  <a
                    target="_blank"
                    href="https://goo.gl/maps/9qBKccPdT81iKQYa9"
                    rel="noreferrer"
                  >
                    #92 E1K, St.19m Doun Penh, Phnom Penh, Cambodia
                  </a>
                </div>
                <div>
                  <FaEnvelope />
                  <a href="mailto:smallworldventure@gmail.com">
                    smallworldventure@gmail.com
                  </a>
                </div>

                <div>
                  <FaTelegramPlane />
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://t.me/smallworldventure"
                  >
                    https://t.me/smallworldventure
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Row className="smallworld" align="middle">
        <Col className="info" xs={24} sm={24} md={12}>
          <h2>SmallWorld</h2>
          <p>
            We look forward to assisting you at any working hour. There are
            several startups in the same building, so you just have to know who
            you are looking for. We will then direct you to the right person!
            Come visit to get a feel of the place!
          </p>
          <p>
            Our address: 2F-01, Raintree, #299 Preah Ang Duong, Sangkat Wat
            Phnom, Khan Daun Penh
          </p>
        </Col>
        <Col xs={24} sm={24} md={12} style={{ lineHeight: "0" }}>
          {" "}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7194322915257!2d104.91694471477136!3d11.571959791784728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513c9eeaf3ed%3A0x438b132cc690d205!2sSmallworld%20Realty!5e0!3m2!1sen!2skh!4v1615121857004!5m2!1sen!2skh"
            title="google-map"
            width="100%"
            height="400"
            style={{ border: "none" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Col>
      </Row>
    </>
  );
}

export default Contact;
