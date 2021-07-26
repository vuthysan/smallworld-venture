import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import UserContext from "../../../context/userContext";
import { JOBSEEKER_LOGIN } from "../../../graphql/mutation";
import { Row, Col, Button, Form, Input, message } from "antd";
// === comps ===
import SignFooter from "../../../comps/Layout/SignFooter";

function JobSeekerSignIn() {
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);

  const [signIn] = useMutation(JOBSEEKER_LOGIN);

  const onFinish = async (values) => {
    await signIn({
      variables: values,
    }).then(async (res) => {
      await message.success(res.data.login_jobseeker.message);
      window.location.replace("/open-opportunities");
    });
  };
  return (
    <>
      {user && window.location.replace("/")}
      {!user && (
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
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
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
      )}
    </>
  );
}

export default JobSeekerSignIn;
