import React from "react";
import { Row, Col, Button, Form, Input } from "antd";
import SignFooter from "../../../comps/SignFooter";

function JobSeekerSignIn() {
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
            <a href="/open-opportunities/jobseeker/signup">Sign Up</a>
          </Button>
        </center>
      </Col>
      <Col className="right-sign">
        <center>
          <h1 style={{ marginTop: "90px" }}>Sign In To Account</h1>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="Input email..." />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Input password..." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign In As Job Seeker
              </Button>
            </Form.Item>
          </Form>
          <p>
            No Account?{" "}
            <a href="/open-opportunities/jobseeker/signup">Register Now</a>
          </p>
          <SignFooter />
        </center>
      </Col>
    </Row>
  );
}

export default JobSeekerSignIn;
