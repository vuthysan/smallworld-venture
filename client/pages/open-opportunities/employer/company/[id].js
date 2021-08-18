import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_COMPANY } from "../../../../graphql/mutation";
import { GET_COMPANY } from "../../../../graphql/query";
import { UploadOutlined } from "@ant-design/icons";
import {
  Divider,
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Spin,
} from "antd";
// === json data ===
import Cities from "../../../../data/cities.json";

const { Option } = Select;

function ViewCompany() {
  const { id } = useRouter().query;
  const [btnLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });

  // === get company by id ===
  const { loading, data } = useQuery(GET_COMPANY, { variables: { id } });

  // === edit company function ===
  const [editCom] = useMutation(EDIT_COMPANY, { variables: { id } });

  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  const { get_company_by_id } = data;

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

    // === delete old logo from server when upload new photo ===
    if (state.imageUrl) {
      await axios
        .delete("http://localhost:5000/image/delete/" + state.imageUrl)
        .catch((err) => console.log(err));
    }

    await axios
      .delete("http://localhost:5000/image/delete/" + get_company_by_id.logo)
      .catch((err) => console.log(err));

    if (info.file.status === "done") {
      // Get this imgurl from response in real world.
      setState({
        imageUrl: info.file.response,
        loading: false,
      });
      // console.log(info.file);
    }
  };

  // ====== upload dragger props ======
  const upload = {
    action: "http://localhost:5000/upload/image",
    name: "image",
    maxCount: 1,
    beforeUpload: beforeUpload,
    onChange: handleChange,
    onRemove: async (data) => {
      // console.log(data.response);
      await axios
        .delete("http://localhost:5000/image/delete/" + data.response)
        .catch((err) => console.log(err));

      setState({
        imageUrl: null,
        loading: false,
      });
      x;
    },
  };

  // === edit company ===
  const onFinish = (values) => {
    const newCom = {
      ...values,
      logo: state.imageUrl ? state.imageUrl : get_company_by_id.logo,
    };
    // console.log(newCom);
    editCom({
      variables: newCom,
    }).then(async (res) => {
      await setLoading(true);
      await message.success(res.data.edit_company.message);
      await setLoading(false);
    });
  };
  return (
    <div className="opp-container">
      <Divider orientation="left">View/Edit Company</Divider>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={get_company_by_id}
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
          rules={[
            {
              required: true,
              message: "Please select a city!",
            },
          ]}
        >
          <Select showSearch>
            {Cities.map((res, i) => (
              <Option key={i} value={res}>
                {res.toUpperCase()}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
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
          label="Recruiter Position"
          name="employer_position"
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
        <Form.Item
          name="logo"
          valuePropName="file"
          rules={[
            {
              required: true,
              message: "Please input logo!",
            },
          ]}
        >
          <Upload
            {...upload}
            defaultFileList={[
              {
                name: get_company_by_id.logo,
                // === response for onRemove when user remove image ===
                response: get_company_by_id.logo,
                url:
                  "http://localhost:5000/public/upload/images/" +
                  get_company_by_id.logo,
              },
            ]}
            name="image"
          >
            <Button className="upload-logo-btn" icon={<UploadOutlined />}>
              Upload Company Logo
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primsopary" htmlType="submit" loading={btnLoading}>
            Edit Company
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ViewCompany;
