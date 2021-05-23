import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

// === form lay out ===
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

// === file management props ===
const props = {
  name: "cv",
  beforeUpload: (file) => {
    if (file.type !== "application/pdf") {
      message.error(`${file.name} is not a pdf file`);
    }
    return file.type === "application/pdf" ? true : Upload.LIST_IGNORE;
  },

  onChange({ file }) {
    if (file.status !== "uploading") {
      console.log(file);
    }
  },
  maxCount: 1,
};
function ApplyNow() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);

    setIsModalVisible(false);
  };
  return (
    <React.Fragment>
      <button className="sw-default-btn apply-now-btn" onClick={showModal}>
        Apply Now
      </button>
      <Modal
        visible={isModalVisible}
        closable={false}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          labelAlign="left"
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "phone"]}
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "message"]}
            initialValue=""
            label="Additional Information (Optional)"
          >
            <Input.TextArea id="aditional-info" />
          </Form.Item>
          {/*  === file management ===  */}
          <Form.Item
            name={["user", "cv"]}
            rules={[{ required: true }]}
            label="Resume/CV"
          >
            <Upload {...props}>
              <Button id="upload-pdf" icon={<UploadOutlined />}>
                Upload PDF
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
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
