import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UserContext from "../../context/userContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { EDIT_USER } from "../../graphql/mutation";

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
// === json data ===
import Interests from "../../data/interests.json";

const { Option } = Select;

function profile() {
  // const { id } = useRouter().query;
  const { user } = useContext(UserContext);

  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [btnDisable, setDisable] = useState(true);

  // === edit jobseeker function ===
  const [editUser] = useMutation(EDIT_USER);

  //   === get jobseeker by id ===
  const { loading, data, refetch } = useQuery(GET_USER);

  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

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
      if (info.file.status === "done" && data.get_user.cv) {
        await axios
          .delete("http://localhost:5000/pdf/delete/" + data.get_user.cv)
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

          editUser({
            variables: { ...values, cv: res.data },
          })
            .then(async (res) => {
              await message.success(res.data.edit_user.message);
            })
            .catch(async () =>
              message.warn("Your old password is not correct!")
            );
        });
    } else {
      // === remove verify from values ===
      delete values.verify;
      delete values.password;
      delete values.newpassword;

      editUser({
        variables: { ...values },
      })
        .then(async (res) => {
          await message.success(res.data.edit_user.message);
          // window.location.replace("/open-opportunities/profile");
          await refetch();
        })
        .catch(
          async () => await message.warn("Your old password is not correct!")
        );
    }
  };

  return (
    <div className="opp-container profile">
      <Divider orientation="left">Profile</Divider>
      {data && (
        <Form
          initialValues={data.get_user}
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
                rules={[{ required: true, message: "Username is required!" }]}
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
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Email is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Phone is required!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Interest" name="interest">
                <Select mode="multiple" onChange={() => setDisable(false)}>
                  {Interests.map((res, i) => (
                    <Option key={i} value={res}>
                      {res}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                onChange={(e) => setFile(e.target.files[0])}
                label="CV/Resume"
                name="cv"
                valuePropName="pdf"
                rules={[
                  { required: "true", message: "CV/Resume is required!" },
                ]}
              >
                <Upload
                  {...props}
                  defaultFileList={
                    data.get_user.cv
                      ? [
                          {
                            name: data.get_user.cv,
                            // === response for onRemove when user remove image ===
                            // response: get_user.cv,
                            url:
                              "http://localhost:5000/public/upload/pdf/" +
                              data.get_user.cv,
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
      )}
    </div>
  );
}

export default profile;
