import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_OPPORTUNITY,
  GET_DEPARTMENTS,
  GET_COMPANIES,
} from "../../../graphql/query";
import { EDIT_OPPORTUNITY } from "../../../graphql/mutation";
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
import FormList from "../../Layout/FormList";
import AppLayout from "../../Layout/Layout";

const { Option } = Select;
function EditOpportunity({ history }) {
  const [form] = Form.useForm();
  const { id } = useParams();

  // === get opportunity by url (id) ===
  const { loading, data, refetch } = useQuery(GET_OPPORTUNITY, {
    variables: { id },
  });
  const { loading: loadingDep, data: depData } = useQuery(GET_DEPARTMENTS);
  const { loading: loadingCom, data: comData } = useQuery(GET_COMPANIES);
  const [edit_opportunity] = useMutation(EDIT_OPPORTUNITY);

  const onFinish = (values) => {
    let editedOpp = { id: id, ...values };
    edit_opportunity({
      variables: editedOpp,
    })
      .then(async (res) => {
        await refetch();
        await message.success(res.data.edit_opportunity.message);
        history.push("/admin/opportunities");
      })
      .catch((err) => console.log(err));
  };
  // === loading data from server ===
  if (loading || loadingDep || loadingCom) {
    return (
      <center style={{ marginTop: "100px" }}>
        <Spin size="large" />
      </center>
    );
  }

  return (
    <AppLayout>
      <h1>Edit Opportunity</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          position: data.get_opportunity.position,
          status: data.get_opportunity.status,
          companyName: data.get_opportunity.companyName,
          departmentId: data.get_opportunity.departmentId,
          responsibilities: data.get_opportunity.responsibilities,
          requirements: data.get_opportunity.requirements,
          conditions: data.get_opportunity.conditions,
        }}
      >
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
                );
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
                  const { name, id } = dep;
                  return (
                    <Option key={id} value={id}>
                      {name.toUpperCase()}
                    </Option>
                  );
                })}
                );
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
          <Button id="submit-btn" type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
}

export default EditOpportunity;
