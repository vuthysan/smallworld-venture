import React, { useState } from "react";
import axios from "axios";
import { POST_APPLICATION } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { Modal, Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function ApplyNow() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");

  const [post_application] = useMutation(POST_APPLICATION);
  // === file management props ===

  const props = {
    name: "pdf",
    // action: "http://localhost:5000/upload/pdf",
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error(`You can upload PDF file Only`);
      }
      return file.type === "application/pdf" ? true : Upload.LIST_IGNORE;
    },
    maxCount: 1,
  };

  const onFinish = async (values) => {
    const { name, email, phone, additional } = values;
    // == post pdf file to public/uplaod/pdf folder in server ==
    const formdata = new FormData();
    formdata.append("pdf", file);

    await axios
      .post("http://localhost:5000/upload/pdf", formdata)
      .then(async (res) => {
        let newApp = {
          name: name,
          email: email,
          phone: phone,
          additional: additional ? additional : "",
          cv: res.data,
        };
        // console.log(newApp);
        post_application({
          variables: newApp,
        }).then(
          async (res) =>
            await message.success(res.data.post_application.message)
        );
      });

    setIsModalVisible(false);
  };
  return (
    <React.Fragment>
      <button
        className="sw-default-btn apply-now-btn"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Apply Now
      </button>
      <Modal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Email is not valid!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="additional"
            label="Additional Information (Optional)"
          >
            <Input.TextArea id="aditional-info" />
          </Form.Item>
          {/*  === file management ===  */}
          <Form.Item
            name="cv"
            onChange={(e) => setFile(e.target.files[0])}
            rules={[
              {
                required: true,
                message: "Please upload your CV/Resume in PDF!",
              },
            ]}
            valuePropName="pdf"
            label="Resume/CV"
          >
            <Upload {...props}>
              <Button id="upload-pdf" icon={<UploadOutlined />}>
                Upload PDF
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button id="apply" htmlType="submit">
              APPLY
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default ApplyNow;
