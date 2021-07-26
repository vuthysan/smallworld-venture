import React from "react";
import { useRouter } from "next/router";
import { GET_JOBSEEKER } from "../../../../graphql/query";
import { useQuery } from "@apollo/client";
import { Divider, Form, Input, Button, Row, Col, Radio, Select } from "antd";

const { Option } = Select;

function profile() {
  const { id } = useRouter().query;
  const [form] = Form.useForm();
  //   === get jobseeker by id ===
  const { loading, data } = useQuery(GET_JOBSEEKER, {
    variables: { id },
  });
  if (loading) return "";
  const { get_jobseeker } = data;

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="opp-container profile">
      <Divider orientation="left">Employer Profile</Divider>
      <Form
        initialValues={get_jobseeker}
        layout="vertical"
        form={form}
        onFinish={onFinish}
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
            <Form.Item
              label="Date of birth"
              name="dateOfBirth"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item
              label="Place of birth"
              name="placeOfBirth"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            {/* === when add mode tag always show warning === */}
            <Form.Item label="Interest" name="interest">
              <Select mode="tags">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
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
