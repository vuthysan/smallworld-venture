import React from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_EMPLOYER } from "../graphql/mutation";
import { Button, Form, Input, Radio, message } from "antd";

function RegisterEmployer({ nextContent, setEmployerId }) {
  const [form] = Form.useForm();

  // === register employer function ===
  const [registerEm] = useMutation(REGISTER_EMPLOYER);

  const onFinish = async (values) => {
    // console.log(values);

    await registerEm({
      variables: values,
    })
      .then(async (res) => {
        await setEmployerId(res.data.register_employer.id);
        await nextContent();
      })
      .catch(() => {
        message.warn("User with this email is already existed!");
      });
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Fullname" name="name" rules={[{ required: true }]}>
        <Input placeholder="Input fullname..." />
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

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: "email", required: true }]}
      >
        <Input placeholder="Input email..." />
      </Form.Item>
      <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
        <Input placeholder="Input phone number..." />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Input password..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegisterEmployer;
