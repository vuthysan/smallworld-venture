import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { EMPLOYER_LOGIN } from "../../../graphql/mutation";
import UserContext from "../../../context/userContext";
import { Row, Col, Button, Form, Input, message } from "antd";
// === comps ===
import SignFooter from "../../../comps/Layout/SignFooter";

function EmployerSignIn() {
  const { user } = useContext(UserContext);
  const [form] = Form.useForm();

  const [login] = useMutation(EMPLOYER_LOGIN);

  // ====== login function =======
  const onFinish = async (values) => {
    await login({
      variables: values,
    })
      .then(async (res) => {
        await message.success(res.data.login_employer.message);
        window.location = "/open-opportunities";
      })
      .catch(
        async (err) => await message.error("Email or passowrd is incorrect!")
      );
  };

  return (
    <>
      {user && window.location.replace("/")}
      {!user && (
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
                <a href="/open-opportunities/employer/signup">Sign Up</a>
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
                    {
                      required: true, 
                      type: "email",
                      message: "Please input your Email!",
                    },
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
                    Sign In As Employer
                  </Button>
                </Form.Item>
              </Form>
              <p>
                No Account?{" "}
                <a href="/open-opportunities/employer/signup">Register Now</a>
              </p>
              <SignFooter />
            </center>
          </Col>
        </Row>
      )}
    </>
  );
}

export default EmployerSignIn;
