import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_EMPLOYER } from "../../../../graphql/mutation";
import { GET_EMPLOYER } from "../../../../graphql/query";
import {
  Divider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  message,
  Spin,
} from "antd";

function profile() {
  const { id } = useRouter().query;
  const [form] = Form.useForm();
  const [btnState, setState] = useState(true);

  const [editEmployer] = useMutation(EDIT_EMPLOYER, { variables: { id } });

  // === get employer by id ===
  const { loading, data, refetch } = useQuery(GET_EMPLOYER, {
    variables: { id: id && id },
  });

  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  // === set submit button state to true when user edit their info ===
  const onChange = () => {
    setState(false);
  };

  // === edit employer info ===
  const onFinish = (values) => {
    // console.log(values);
    if (values.newpassword !== values.verify) {
      message.warn("Your new password does not match!");
    } else {
      delete values.verify;
      // console.log(values);
      editEmployer({
        variables: { ...values },
      })
        .then(async (res) => {
          await message.success(res.data.edit_employer.message);
          await refetch();
        })
        .catch(async () => message.warn("Your old password is not correct!"));
    }
  };
  return (
    <div className="opp-container profile">
      <Divider orientation="left">Employer Profile</Divider>

      {data && (
        <Form
          layout="vertical"
          form={form}
          onChange={onChange}
          onFinish={onFinish}
          initialValues={data.get_employer}
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
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Password Setting</Divider>
          <Form.Item label="Old Password" name="password">
            <Input.Password className="password" />
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
              disabled={btnState}
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
