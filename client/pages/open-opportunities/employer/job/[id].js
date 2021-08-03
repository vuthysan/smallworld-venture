import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "../../../../context/userContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB, GET_EMPLOYER_COMPANIES } from "../../../../graphql/query";
import { EDIT_JOB } from "../../../../graphql/mutation";
import { Divider, Form, Input, Button, Select, message } from "antd";
// === comps ===
import ArrayForm from "../../../../comps/ArrayForm";

const { Option } = Select;

function viewjob() {
  const { id } = useRouter().query;
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const [btnLoading, setBtnLoading] = useState(false);

  // === edit job function ===
  const [editJob] = useMutation(EDIT_JOB, { variables: { id } });

  // === get job by job id ===
  const { loading, data } = useQuery(GET_JOB, { variables: { id } });

  // === get employer's companies ===
  const { loading: loadingCom, data: comData } = useQuery(
    GET_EMPLOYER_COMPANIES,
    {
      variables: { id: user && user.id },
    }
  );
  if (loading || loadingCom) return "";

  const { get_job } = data;
  const { get_employer } = comData;

  const onFinish = (values) => {
    const job = {
      ...values,
      salary: values.salary ? values.salary : "Negotable",
    };

    editJob({
      variables: job,
    }).then(async (res) => {
      await setBtnLoading(true);
      await message.success(res.data.edit_job.message);
      await setBtnLoading(false);
    });
  };

  return (
    <div className="opp-container">
      <Divider orientation="left">View/Edit Job</Divider>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={get_job}
      >
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
          {/* ===== select company ===== */}
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
        <Form.Item label="Type" name="type">
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
          <Button type="primary" htmlType="submit" loading={btnLoading}>
            Edit Job
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default viewjob;
