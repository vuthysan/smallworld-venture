import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import SignFooter from "./SignFooter";

const { Option } = Select;

function EmployerSignUp() {
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish = (values) => {
    console.log(values);
    next();
  };
  const onFinishCom = (values) => {
    console.log(values);
  };
  const steps = [
    {
      content: (
        <>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Fullname"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input fullname..." />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", required: true }]}
            >
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
                Next
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      content: (
        <>
          <Form form={form} onFinish={onFinishCom} layout="vertical">
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input company name..." />
            </Form.Item>

            <Form.Item label="City" name="city" rules={[{ required: true }]}>
              <Select
                showSearch
                style={{ borderRadius: "4px" }}
                placeholder="Select a city"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Recruiter Position"
              name="position"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input recruiter position..." />
            </Form.Item>
            <Form.Item
              label="About Company"
              name="about"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                showCount
                maxLength={200}
                placeholder="Input company info..."
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  return (
    <center>
      <h1 style={{ marginTop: "40px" }}>Sign Up As Job Seeker</h1>
      <div className="steps-content">{steps[current].content}</div>
      <SignFooter />
    </center>
  );
}

export default EmployerSignUp;
