import React from "react";
import { Form, Input, Radio, Select, Button, Row, Col } from "antd";

// === comps ===
import Responsibility from "../../Layout/Responsibility";
import Requirement from "../../Layout/Requirements";
import Condition from "../../Layout/Condition";
const { Option } = Select;
function AddOpportunity() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <h1>Add Opportunity</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="position"
          label="Position"
          rules={[
            {
              required: true,
              message: "Please input opportunity's position",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: `Plase select opportunity's status!`,
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>True</Radio>
            <Radio value={false}>false</Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={30}>
          <Col span={7}>
            <Form.Item
              name="companyName"
              label="Select Company"
              hasFeedback
              rules={[{ required: true, message: "Please select a company!" }]}
            >
              <Select placeholder="Select a company">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="departmentId"
              label="Select Department"
              hasFeedback
              rules={[
                { required: true, message: "Please select a department!" },
              ]}
            >
              <Select placeholder="Select a company">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* === input responsibilities === */}
        <Responsibility />
        {/* === input requirement === */}
        <Requirement />
        {/* === input conditions === */}
        <Condition />
        <Form.Item>
          <Button
            id="submit-btn"
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: "175px" }}
          >
            Add Opportunity
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddOpportunity;
