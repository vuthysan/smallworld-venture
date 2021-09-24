import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMPANIES } from "../../../graphql/query";
import { ADD_COMPANY } from "../../../graphql/mutation";
import axios from "axios";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
// === comps ===
import AppLayout from "../../Layout/Layout";
function AddCompany() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [loading, setLoading] = useState(false);
  const [add_company] = useMutation(ADD_COMPANY);
  const { refetch } = useQuery(GET_COMPANIES);

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
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this imgurl from response in real world.
      setState({
        imageUrl: info.file.response,
        loading: false,
      });
      // console.log(info.file);
    }
  };

  // ======= add new company ======
  const onFinish = (values) => {
    // console.log(values);
    const { name, description } = values;
    let newCom = {
      // === trim to avoid space ===
      name: name.trim(),
      description: description,
      logo: state.imageUrl,
    };
    // console.log(newCom);
    add_company({
      variables: newCom,
    }).then(async (res) => {
      setLoading(true);
      await refetch();
      setLoading(false);
      // ===== check if company is already existed =====
      if (res.data.add_company.existed) {
        await message.error(res.data.add_company.message);
      } else {
        await message.success(res.data.add_company.message);
        form.resetFields();
        setState({
          imageUrl: null,
          loading: false,
        });
      }
    });
  };

  // ====== upload dragger props ======
  const upload = {
    action: "http://localhost:5000/upload/image",
    name: "image",
    className: "avatar-uploader",
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
    },
  };
  return (
    <AppLayout>
      <h1>Add Company</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={60}>
          <Col xl={16}>
            <Form.Item
              label="Company Name"
              name="name"
              rules={[
                { required: true, message: `Please input company's name!` },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: `Please input company's description!`,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="logo"
              valuePropName="file"
              rules={[
                {
                  required: true,
                  message: "Please upload your company's logo!",
                },
              ]}
            >
              <Upload.Dragger {...upload}>
                <p className="ant-upload-drag-icon">
                  {state.imageUrl ? (
                    <img
                      width="300"
                      src={`http://localhost:5000/public/upload/images/${state.imageUrl}`}
                      alt="uploaed logo"
                    />
                  ) : (
                    <img src="/images/upload.svg" alt="upload svg extension" />
                  )}
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            id="submit-btn"
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading ? true : false}
          >
            Add Company
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
}

export default AddCompany;
