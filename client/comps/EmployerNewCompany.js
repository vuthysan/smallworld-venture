import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { ADD_COMPANY } from "../graphql/mutation";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
// === json data ===
import Cities from "../data/cities.json";

function EmployerNewCompany({ employerId }) {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });

  // === add company ===
  const [addCom] = useMutation(ADD_COMPANY);

  // ====== file management =======
  function beforeUpload(file) {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("You can only upload PNG file!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isPng && isLt2M;
  }
  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setState({ ...state, loading: true });
      return;
    }
    console.log(state);
    // === delete uploaded image if user change logo ===
    if (state.imageUrl) {
      await axios
        .delete("http://localhost:5000/image/delete/" + state.imageUrl)
        .catch((err) => console.log(err));
    }
    if (info.file.status === "done") {
      // Get this imgurl from response in real world.
      setState({
        imageUrl: info.file.response,
        loading: false,
      });
      // console.log(info.file)x;
    }
  };

  // ====== upload dragger props ======
  const upload = {
    action: "http://localhost:5000/upload/image",
    name: "image",
    maxCount: 1,
    beforeUpload: beforeUpload,
    onChange: handleChange,
  };

  const onFinish = (values) => {
    const newCom = {
      ...values,
      employerId,
      website: values.website ? values.website : "N/A",
      logo: state.imageUrl,
    };
    // console.log(newCom);
    addCom({
      variables: newCom,
    })
      .then(async (res) => {
        await message.success(res.data.add_company.message);
        // await window.location.replace("/open-opportunities/employer/signin")
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Company Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Input company name..." />
      </Form.Item>
      <Form.Item label="Website (Optional)" name="website">
        <Input placeholder="Input company name..." />
      </Form.Item>
      {/* ====== upload logo ====== */}
      <Form.Item
        label="Logo"
        name="logo"
        valuePropName="file"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Upload {...upload} name="image">
          <Button className="upload-logo-btn" icon={<UploadOutlined />}>
            Upload Company Logo
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Select showSearch placeholder="Select a city">
          {Cities.map((res, i) => (
            <Option key={i} value={res}>
              {res.toUpperCase()}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Recruiter Position"
        name="employer_position"
        rules={[{ required: true }]}
      >
        <Input placeholder="Input recruiter position..." />
      </Form.Item>
      <Form.Item
        label="About Company"
        name="about"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          showCount
          maxLength={200}
          placeholder="Input company info..."
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EmployerNewCompany;
