import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB, GET_USER_COMPANIES } from "../../../graphql/query";
import { EDIT_JOB } from "../../../graphql/mutation";
import { Divider, Form, Input, Button, Select, message, Spin } from "antd";
// === comps ===
import ArrayForm from "../../../comps/ArrayForm";
// === json data ===
import Interests from "../../../data/interests.json";

const { Option } = Select;

function viewjob() {
  const { id } = useRouter().query;

  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);

  // === edit job function ===
  const [editJob] = useMutation(EDIT_JOB, { variables: { id } });

  // === get job by job id ===
  const { loading, data } = useQuery(GET_JOB, { variables: { id } });

  // === get user's companies ===
  const { loading: loadingCom, data: comData } = useQuery(GET_USER_COMPANIES);

  if (loading || loadingCom) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

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
      {data && (
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={data.get_job}
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
              {comData.get_user.companies.map((res) => {
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
          <Form.Item label="Type" name="type">
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
            <Button type="primary" htmlType="submit" loading={btnLoading}>
              Edit Job
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default viewjob;
