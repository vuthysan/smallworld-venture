import React, { useState, useContext } from "react";
import UserContext from "../../../context/userContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYER_COMPANIES } from "../../../graphql/query";
import { ADD_JOB } from "../../../graphql/mutation";
import { Divider, Form, Input, Button, Select, message } from "antd";
// === comps ===
import ArrayForm from "../../../comps/ArrayForm";
const { Option } = Select;

function addjob() {
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const [btnState, setBtnState] = useState(false);

  // === add new job function ===
  const [addJob] = useMutation(ADD_JOB);

  // === get employer's companies ===
  const { loading, data } = useQuery(GET_EMPLOYER_COMPANIES, {
    variables: { id: user && user.id },
  });
  if (loading) return "";

  const { get_employer } = data;

  const onFinish = (values) => {
    const newJob = {
      ...values,
      salary: values.salary ? values.salary : "Negotable",
      employerId: user.id,
    };
    addJob({
      variables: newJob,
    }).then(async (res) => {
      await setBtnState(true);
      await message.success(res.data.add_job.message);
      await setBtnState(false);
    });
  };
  return (
    <div className="opp-container">
      <Divider orientation="left">Add Job</Divider>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please input job position",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name="company_name"
          rules={[
            {
              required: true,
              message: "Please select a company!",
            },
          ]}
        >
          <Select>
            {get_employer.companies.map((res) => {
              const { name, id } = res;
              return (
                <Option key={id} value={name}>
                  {name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Salary$ (Optional)" name="salary">
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select types of this job!",
            },
          ]}
        >
          <Select mode="tags">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>
        {/* === requirements array === */}
        <ArrayForm name="requirements" message="Requirement"></ArrayForm>
        {/* === decriptions array === */}
        <ArrayForm name="descriptions" message="Description"></ArrayForm>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={btnState}>
            Add Job
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default addjob;
