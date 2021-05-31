import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { LOGIN } from "../../graphql/mutation";
import { Form, Input, Button, message } from "antd";

// === antd form layout ===

function Login() {
  const [loading, setLoading] = useState(false);
  const [login] = useMutation(LOGIN);
  const onFinish = (values) => {
    // console.log(values);
    login({
      variables: {
        ...values,
      },
    }).then(async (res) => {
      Cookie.set("swtoken", res.data.login.token, { secure: true, expires: 1 });
      const token = Cookie.get("swtoken");
      const decoded = jwt.decode(token);
      if (decoded) {
        setLoading(true);
        await message.success(res.data.login.message);
        window.location.replace("/");
      } else {
        await message.error("Your email or password is incorrect!");
      }
    });
  };

  return (
    <div className="login-page">
      <div className="space-img">
        <img src="/images/space-ship.svg" alt="start up commnuity spaceship" />
      </div>
      <div className="form">
        <div className="logo">
          <img
            src="/images/sw-white.png"
            width="170px"
            alt="smallworldventure logo"
          />
        </div>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <p>SmallworldVenture Dashboard Login </p>
          <Form.Item
            className="input"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" className="input-login" />
          </Form.Item>
          <Form.Item
            className="input"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" className="input-login" />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-btn"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
