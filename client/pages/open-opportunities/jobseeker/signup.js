import React from "react";
import { Row, Col, Button, Form, Input } from "antd";
import SignFooter from "../../../comps/SignFooter";

function JobSeekerSignUp() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Row justify="center" align="middle" className="sign">
      <Col className="left-sign">
        <center>
          <img
            width="180"
            src="/images/home/sw-white.png"
            alt="smallworld logo"
          />
          <div className="line"></div>
          <p>
            Lorem ipsum dolor sit consectetur consectetur amet consectetur
            adipisicing elit. Illo itaque
          </p>
          <Button id="sign-btn">
            <a href="/open-opportunities/jobseeker/signin">Sign In</a>
          </Button>
        </center>
      </Col>
      <Col className="right-sign sign-up">
        <center>
          <h1 style={{ marginTop: "40px" }}>Sign Up As Job Seeker</h1>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input username..." />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Input email..." />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input phone number..." />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Input password..." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <SignFooter />
        </center>
      </Col>
    </Row>
  );
}

export default JobSeekerSignUp;
