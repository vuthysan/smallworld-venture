import React, { useContext } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../graphql/mutation";
import { Row, Col, Button, Form, Input, message } from "antd";
// === comps ===
import SignFooter from "../../comps/Layout/SignFooter";

const ACCOUNTS_URL = process.env.ACCOUNTS_URL;

function JobSeekerSignIn() {
  const [form] = Form.useForm();

  const [login] = useMutation(USER_LOGIN);

  const onFinish = async (values) => {
    axios
      .post(`${ACCOUNTS_URL}/login`, { ...values })
      .then(async (res) => {
        const { access_token, refresh_token } = res.data;
        await localStorage.setItem("access_token", access_token);
        await localStorage.setItem("refresh_token", refresh_token);
        // await message.success("ចូលទៅគណនីដោយទទួល ជោគជ័យ");
        await message.success("Successfull!");
        await window.location.replace("/open-opportunities");
      })
      .catch((err) => {
        message.error("Email or password is incorrect!");
        console.log(err);
      });

    // await login({
    //   variables: values,
    // })
    //   .then(async (res) => {
    //     await message.success(res.data.login.message);
    //     window.location.replace("/open-opportunities");
    //   })
    //   .catch(async (err) => {
    //     await message.error("Email or password is incorrect!");
    //   });
  };
  return (
    <>
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
              <a href="/open-opportunities/signup">Sign Up</a>
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
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <p>
              No Account? <a href="/open-opportunities/signup">Register Now</a>
            </p>
            <SignFooter />
          </center>
        </Col>
      </Row>
    </>
  );
}

export default JobSeekerSignIn;
