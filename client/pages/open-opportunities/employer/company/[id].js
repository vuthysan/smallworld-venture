import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Divider, Form, Input, Button, Select, Upload } from "antd";
const { Option } = Select;

function ViewCompany() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="opp-container">
      <Divider orientation="left">View/Edit Company</Divider>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: "KOOMPI",
          city: "lucy",
          recruiterPosition: "HR Manager",
          about: "soemthing askldfjasdjlfadsklfjlkas",
        }}
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your company name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          initialValue="lucy"
          rules={[
            {
              required: true,
              message: "Please select a city!",
            },
          ]}
        >
          <Select>
            <Option value="jack">Phnom Penh</Option>
            <Option value="lucy">Battambang</Option>
            <Option value="Yiminghe">Kampong Cham</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Recruiter Position"
          name="recruiterPosition"
          rules={[
            {
              required: true,
              message: "Please input your position",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="About Company"
          name="about"
          rules={[
            {
              required: true,
              message: "Please input your company name",
            },
          ]}
        >
          <Input.TextArea maxLength="300" showCount />
        </Form.Item>
        <Upload>
          <Button className="upload-logo-btn" icon={<UploadOutlined />}>
            Upload Company Logo
          </Button>
        </Upload>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Edit Company
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ViewCompany;
