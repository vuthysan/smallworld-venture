import { Row, Col, Form, Input, Button, message } from "antd";
import { useMutation } from "@apollo/client";
import { POST_MESSAGE } from "../graphql/mutation";
import { useState } from "react";
import { FaTelegramPlane, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import MetaTags from "../comps/MetaTags";

function Contact() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [post_message] = useMutation(POST_MESSAGE);

  const onFinish = (values) => {
    post_message({
      variables: values,
    }).then(async (res) => {
      setIsLoading(true);

      await message.success(res.data.post_message.respond);
      form.resetFields();
      setIsLoading(false);
    });
  };
  return (
    <>
      <MetaTags
        title="Open-Opportunities"
        description="We look forward to assisting you at any working hour. There are several startups in the same building, so you just have to know who you are looking for."
        canonical="https://smallworldventure.com/contact"
        thumbnail="https://smallworldventure.com/images/thumbnail/contact.png"
      />
      <div className="container">
        <div className="contact-page">
          <Row gutter={50}>
            <Col xs={24} sm={24} md={12}>
              <h2>Inquiries Request</h2>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="fullname"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input your fullname!" },
                  ]}
                >
                  <Input />
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
                  <Input />
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
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <br />
                  <Button
                    className="sw-default-btn"
                    htmlType="submit"
                    size="large"
                    loading={isLoading ? true : false}
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
