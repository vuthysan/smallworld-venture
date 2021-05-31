import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DEPARTMENTS } from "../../../graphql/query";
import { ADD_DEPARTMENT } from "../../../graphql/mutation";
import axios from "axios";
import { Form, Input, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

// === comps ===
import AppLayout from "../../Layout/Layout";

function AddDepartment() {
  const [form] = Form.useForm();
  // === icon of deparment's state ===
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });

  // === laoding when submitting new deparment to sever ===
  const [loading, setLoading] = useState(false);

  const [add_department] = useMutation(ADD_DEPARTMENT);
  const { refetch } = useQuery(GET_DEPARTMENTS);

  // ====== file management =======
  function beforeUpload(file) {
    const isPngOrSvg =
      file.type === "image/png" || file.type === "image/svg+xml";
    if (!isPngOrSvg) {
      message.error("You can only upload PNG/SVG file!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isPngOrSvg && isLt2M;
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
  // === remove image from server's public folder ===
  const onRemove = async (data) => {
    // console.log(data.response)
    await axios
      .delete("http://localhost:5000/image/delete/" + data.response)
      .catch((err) => console.log(err));

    setState({
      imageUrl: null,
      loading: false,
    });
  };
  const onFinish = (values) => {
    // console.log(values);
    const { name } = values;
    let newDep = {
      name: name,
      icon: state.imageUrl,
    };
    // console.log(newDep);
    add_department({
      variables: newDep,
    }).then(async (res) => {
      setLoading(true);
      await refetch();
      setLoading(false);
      await message.success(res.data.add_department.message);
      form.resetFields();
      setState({
        imageUrl: null,
        loading: false,
      });
    });
  };
  return (
    <AppLayout>
      <h1>Add Department</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Department Name"
          name="name"
          rules={[
            { required: true, message: `Please input department's name!` },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="icon"
          valuePropName="file"
          rules={[
            {
              required: true,
              message: `Please upload department's icon!`,
            },
          ]}
        >
          <Upload
            action="http://localhost:5000/upload/image"
            name="image"
            maxCount={1}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onRemove={onRemove}
          >
            <div className="upload-frame">
              {state.imageUrl ? (
                <img
                  height="45"
                  width="80"
                  src={`http://localhost:5000/public/upload/images/${state.imageUrl}`}
                  alt="uploaed logo"
                />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            id="submit-btn"
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading ? true : false}
            style={{ width: "170px" }}
          >
            Add Department
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
}

export default AddDepartment;
