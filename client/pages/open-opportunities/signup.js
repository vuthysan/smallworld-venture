import React from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutation";
import { Row, Col, Button, Form, Input, message } from "antd";
// === comps ===
import SignFooter from "../../comps//Layout/SignFooter";

function JobSeekerSignUp() {
  const [form] = Form.useForm();

  // === register jobseeker function ===
  const [register] = useMutation(REGISTER_USER);

  const onFinish = (values) => {
    if (values.password !== values.verify) {
      message.error("Password does not match");
    } else {
      register({
        variables: values,
      })
        .then(async (res) => {
          await message.success(res.data.register_user.message);
          window.location.replace("/open-opportunities/signin");
        })
        .catch(async () => {
          message.error("User with this email is already existed!");
        });
    }
  };

  return (
    <Row justify="center" align="middle" className="sign sign-up">
      <Col className="left-sign">
        <center>
          <a href="/open-opportunities/">
            <img
              width="180"
              src="/images/home/sw-white.png"
              alt="smallworld logo"
            />
          </a>
          <div className="line"></div>
          <p>
            Lorem ipsum dolor sit consectetur consectetur amet consectetur
            adipisicing elit. Illo itaque
          </p>
          <Button id="sign-btn">
            <a href="/open-opportunities/signin">Sign In</a>
          </Button>
        </center>
      </Col>
      <Col className="right-sign sign-up">
        <center>
          <h1 style={{ marginTop: "25px" }}>Sign Up</h1>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input username..." />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Input email..." />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Input password..." />
            </Form.Item>
            <Form.Item
              label="Verify Password"
              name="verify"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Verify password..." />
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
