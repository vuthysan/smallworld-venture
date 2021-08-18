import React from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_JOBSEEKR } from "../../../graphql/mutation";
import { Row, Col, Button, Form, Input, Radio, message } from "antd";
// === comps ===
import SignFooter from "../../../comps//Layout/SignFooter";

function JobSeekerSignUp() {
  const [form] = Form.useForm();

  // === register jobseeker function ===
  const [registerSeeker] = useMutation(REGISTER_JOBSEEKR);

  const onFinish = (values) => {
    // console.log(values);
    registerSeeker({
      variables: values,
    })
      .then(async (res) => {
        await message.success(res.data.register_jobseeker.message);
        window.location.replace("/open-opportunities/jobseeker/signin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Row justify="center" align="middle" className="sign">
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
            <a href="/open-opportunities/jobseeker/signin">Sign In</a>
          </Button>
        </center>
      </Col>
      <Col className="right-sign sign-up">
        <center>
          <h1 style={{ marginTop: "25px" }}>Sign Up As Job Seeker</h1>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input username..." />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 11 }}
              label="Gender"
              name="gender"
              rules={[{ required: true }]}
            >
              <Radio.Group name="radiogroup">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
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
