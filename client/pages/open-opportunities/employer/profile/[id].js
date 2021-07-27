import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYER } from "../../../../graphql/query";
import { Divider, Form, Input, Button, Row, Col, Radio } from "antd";

function profile() {
  const { id } = useRouter().query;
  const [form] = Form.useForm();

  // === get employer by id ===
  const { loading, data } = useQuery(GET_EMPLOYER, {
    variables: { id },
  });
  if (loading) return "";
  const { get_employer } = data;
  console.log(get_employer);
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="opp-container profile">
      <Divider orientation="left">Employer Profile</Divider>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={get_employer}
      >
        <Row gutter={[12]}>
          <Col sm={12}>
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Gender" name="gender">
              <Radio.Group name="radiogroup">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Password Setting</Divider>
        <Form.Item label="Old Password" name="oldpassword">
          <Input.Password />
        </Form.Item>
        <Row gutter={[12]}>
          <Col sm={12}>
            <Form.Item label="New Password" name="newpassword">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Verify Password" name="verify ">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button
            className="profile-submit-btn"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default profile;
