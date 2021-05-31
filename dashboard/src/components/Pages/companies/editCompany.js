import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMPANY } from "../../../graphql/query";
import { EDIT_COMPANY } from "../../../graphql/mutation";
import { Form, Input, Button, Row, Col, Upload, message, Spin } from "antd";

// === comps ===
import AppLayout from "../../Layout/Layout";

function EditCompany({ history }) {
  const { id } = useParams();
  const [form] = Form.useForm();

  // === state of original image before user change it ===
  const [defaultImg, setDefaultImd] = useState(true);
  // ==== image state ====
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });

  // ==== get company by url path (id) ====
  const {
    loading: companyLoading,
    data: companyData,
    refetch: companyRefetch,
  } = useQuery(GET_COMPANY, {
    variables: { id },
  });
  const [edit_company] = useMutation(EDIT_COMPANY);

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

  // ====== upload dragger props ======
  const upload = {
    action: "http://localhost:5000/upload/image",
    name: "image",
    className: "avatar-uploader",
    // maxCount: 1,
    beforeUpload: beforeUpload,
    onChange: handleChange,
    onRemove: async (data) => {
      // console.log(data);
      // ===== delete image from server folder =====
      await axios
        .delete("http://localhost:5000/image/delete/" + data.response)
        .then()
        .catch((err) => console.log(err));
      setState({
        imageUrl: null,
        loading: false,
      });
      setDefaultImd(false);
    },
  };
  // ======= add new company ======
  const onFinish = (values) => {
    const { name, description } = values;
    let editedCom = {
      name: name,
      description: description,
      logo: state.imageUrl ? state.imageUrl : companyData.get_company.logo,
      id: id,
    };
    // console.log(editedCom);
    edit_company({
      variables: editedCom,
    }).then(async (res) => {
      await message.success(res.data.edit_company.message);
      await companyRefetch();
      await history.push("/admin/companies");
    });
  };

  // === waiting data from server ===
  if (companyLoading) {
    return (
      <center style={{ marginTop: "100px" }}>
        <Spin size="large" />
      </center>
    );
  }
  return (
    <AppLayout>
      <h1>Edit Company</h1>
      <Form
        form={form}
        initialValues={{
          name: companyData.get_company.name,
          description: companyData.get_company.description,
          logo: companyData.get_company.logo,
        }}
        layout="vertical"
        onFinish={onFinish}
      >
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
                  message: "Please input logo!",
                },
              ]}
            >
              <Upload.Dragger
                {...upload}
                defaultFileList={[
                  {
                    name: companyData.get_company.logo,
                    // === response for onRemove when user remove image ===
                    response: companyData.get_company.logo,
                    url:
                      "http://localhost:5000/public/upload/images" +
                      companyData.get_company.logo,
                  },
                ]}
              >
                <p className="ant-upload-drag-icon">
                  {/* === new upload image ===  */}
                  {state.imageUrl ? (
                    <img
                      width="300"
                      src={`http://localhost:5000/public/upload/images/${state.imageUrl}`}
                      alt="uploaed logo"
                    />
                  ) : // === original image before deleted or change ===
                  defaultImg ? (
                    <img
                      width="300"
                      src={`http://localhost:5000/public/upload/images/${companyData.get_company.logo}`}
                      alt=""
                    />
                  ) : (
                    // === upload icon ===
                    <img src="/images/upload.svg" alt="upload svg extension" />
                  )}
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={24}>
          <Button id="submit-btn" type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
}

export default EditCompany;
