import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_DEPARTMENTS,
  GET_COMPANIES,
  GET_OPPORTUNITIES,
} from "../../../graphql/query";
import { ADD_OPPORTUNITY } from "../../../graphql/mutation";
import {
  Form,
  Input,
  Radio,
  Select,
  Button,
  Row,
  Col,
  Spin,
  message,
} from "antd";

// === comps ===
// FormList = Repsonsibilities,Requirements,Conditions's Input
import FormList from "../../Layout/FormList";
import AppLayout from "../../Layout/Layout";

const { Option } = Select;
function AddOpportunity() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //  === query ===
  const { refetch } = useQuery(GET_OPPORTUNITIES);
  const { loading: loadingDep, data: depData } = useQuery(GET_DEPARTMENTS);
  const { loading: loadingCom, data: comData } = useQuery(GET_COMPANIES);

  // === mutatatoin ===
  const [add_opportunity] = useMutation(ADD_OPPORTUNITY);

  const onFinish = (values) => {
    console.log(values);
    add_opportunity({
      variables: values,
    })
      .then(async (res) => {
        setLoading(true);
        await refetch();
        setLoading(false);
        await message.success(res.data.add_opportunity.message);
      })
      .catch((err) => console.log(err));
  };
  if (loadingDep || loadingCom) {
    return (
      <center style={{ marginTop: "100px" }}>
        <Spin size="large" />
      </center>
    );
  }

  return (
    <AppLayout>
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
                {comData.get_companies.map((com) => {
                  const { name, id } = com;
                  return (
                    <Option key={id} value={name}>
                      {name.toUpperCase()}
                    </Option>
                  );
                })}
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
              <Select placeholder="Select a department">
                {depData.get_departments.map((dep) => {
                  const { id, name } = dep;
                  return (
                    <Option key={id} value={id}>
                      {name.toUpperCase()}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* === input responsibilities === */}
        <FormList name="Responsibilities" message="Responsibility" />

        {/* === input requirement === */}
        <FormList name="Requirements" message="Requirement" />

        {/* === input conditions === */}
        <FormList name="Conditions" message="Condition" />
        <Form.Item>
          <Button
            id="submit-btn"
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: "175px" }}
            loading={loading ? true : false}
          >
            Add Opportunity
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
}

export default AddOpportunity;
