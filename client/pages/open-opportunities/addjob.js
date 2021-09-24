import React, { useState, useContext } from "react";
import UserContext from "../../context/userContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_COMPANIES } from "../../graphql/query";
import { ADD_JOB } from "../../graphql/mutation";
import { Divider, Form, Input, Button, Select, message, Spin } from "antd";
// === comps ===
import ArrayForm from "../../comps/ArrayForm";
// === json data ===
import Interests from "../../data/interests.json";

const { Option } = Select;

function addjob() {
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const [btnState, setBtnState] = useState(false);

  // === add new job function ===
  const [addJob] = useMutation(ADD_JOB);

  // === get employer's companies ===
  const { loading, data } = useQuery(GET_USER_COMPANIES, {
    variables: { id: user && user.id },
  });
  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  const onFinish = (values) => {
    const newJob = {
      ...values,
      salary: values.salary ? values.salary : "Negotable",
      userId: user.id,
    };
    addJob({
      variables: newJob,
    }).then(async (res) => {
      await setBtnState(true);
      await form.resetFields();
      await setBtnState(false);
      await message.success(res.data.add_job.message);
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
              message: "Please input job position!",
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
              message:
                data && data.get_user.companies.length < 1
                  ? "Please add company first before post a job."
                  : "Please select a company!",
            },
          ]}
        >
          <Select>
            {data &&
              data.get_user.companies.map((res) => {
                const { name, id } = res;
                return (
                  <Option key={id} value={name}>
                    {name.toUpperCase()}
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
          <Select mode="multiple">
            {Interests.map((res, i) => (
              <Option key={i} value={res}>
                {res.toUpperCase()}
              </Option>
            ))}
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
