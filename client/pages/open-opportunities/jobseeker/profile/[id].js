import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOBSEEKER } from "../../../../graphql/query";
import { EDIT_JOBSEEKER } from "../../../../graphql/mutation";

import {
  Divider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Select,
  Upload,
  message,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function profile() {
  const { id } = useRouter().query;
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [btnDisable, setDisable] = useState(true);

  // === edit jobseeker function ===
  const [editSeeker] = useMutation(EDIT_JOBSEEKER, { variables: { id } });

  //   === get jobseeker by id ===
  const { loading, data } = useQuery(GET_JOBSEEKER, {
    variables: { id },
  });

  if (loading) {
    return (
      <center>
        <Spin size="large" />
      </center>
    );
  }
  const { get_jobseeker } = data;

  // === cv(pdf) upload props ===
  const props = {
    name: "pdf",
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error(`You can upload PDF file only!`);
      }
      return file.type === "application/pdf" ? true : Upload.LIST_IGNORE;
    },
    onChange: async (info) => {
      // === remove old cv(pdf) file from server if user upload new cv(pdf) ===
      if (info.file.status === "done" && get_jobseeker.cv) {
        await axios
          .delete("http://localhost:5000/pdf/delete/" + get_jobseeker.cv)
          .catch((err) => console.log(err));
      }
    },
    // onRemove: async (data) => {
    //   await axios
    //     .delete("http://localhost:5000/pdf/delete/" + data.response)
    //     .catch((err) => console.log(err));
    //   await setFile("");
    // },
    maxCount: 1,
  };

  const onFinish = async (values) => {
    // console.log(values);
    if (values.newpassword !== values.verify) {
      message.warn("Your new password does not match!");
    } else if (file) {
      // === check if user upload new cv(pdf) ===
      // == post pdf file to public/uplaod/pdf folder in server ==
      const formdata = new FormData();
      formdata.append("pdf", file);

      await axios
        .post("http://localhost:5000/upload/pdf", formdata)
        .then(async (res) => {
          // === remove verify from values ===
          delete values.verify;

          editSeeker({
            variables: { ...values, cv: res.data },
          })
            .then(async (res) => {
              await message.success(res.data.edit_jobseeker.message);
            })
            .catch(async () =>
              message.warn("Your old password is not correct!")
            );
        });
    } else {
      // === remove verify from values ===
      delete values.verify;
      editSeeker({
        variables: { ...values },
      })
        .then(async (res) => {
          await message.success(res.data.edit_jobseeker.message);
          window.location.replace(
            "/open-opportunities/jobseeker/profile/" + id
          );
          x;
        })
        .catch(async () => message.warn("Your old password is not correct!"));
    }
  };

  return (
    <div className="opp-container profile">
      <Divider orientation="left">Employer Profile</Divider>
      <Form
        initialValues={get_jobseeker}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onChange={() => setDisable(false)}
      >
        <Row gutter={[12]}>
          <Col sm={12}>
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={12}>
            <Form.Item label="Gender" name="gender">
              <Radio.Group name="radiogroup">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col sm={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Phone Number" name="phone">
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12}>
            {/* === when add mode tag always show warning === */}
            <Form.Item label="Interest" name="interest">
              <Select mode="tags">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              onChange={(e) => setFile(e.target.files[0])}
              label="CV/Resume"
              name="cv"
              valuePropName="pdf"
              rules={[{ required: true }]}
            >
              <Upload
                {...props}
                defaultFileList={
                  get_jobseeker.cv
                    ? [
                        {
                          name: get_jobseeker.cv,
                          // === response for onRemove when user remove image ===
                          // response: get_jobseeker.cv,
                          url:
                            "http://localhost:5000/public/upload/pdf/" +
                            get_jobseeker.cv,
                        },
                      ]
                    : ""
                }
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Password Setting</Divider>
        <Form.Item label="Old Password" name="password">
          <Input.Password />
        </Form.Item>
        <Row gutter={[12]}>
          <Col sm={12}>
            <Form.Item label="New Password" name="newpassword">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Verify Password" name="verify">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button
            className="profile-submit-btn"
            type="primary"
            htmlType="submit"
            disabled={btnDisable}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default profile;
