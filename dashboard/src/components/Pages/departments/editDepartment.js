import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DEPARTMENT } from "../../../graphql/query";
import { EDIT_DEPARTMENT } from "../../../graphql/mutation";
import axios from "axios";
import { Form, Input, Button, Upload, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function EditDepartment({ history }) {
  const { id } = useParams();
  const [form] = Form.useForm();
  // === state of original image before user change ===
  const [defaultImg, setDefaultImg] = useState(true);

  // === icon of deparment's state ===
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });

  // ==== get department by url path (id) ====
  const {
    loading: departmentLoading,
    data: departmentData,
    refetch: departmentRefetch,
  } = useQuery(GET_DEPARTMENT, {
    variables: { id },
  });
  const [edit_department] = useMutation(EDIT_DEPARTMENT);
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
    setDefaultImg(false);
  };

  const onFinish = (values) => {
    const { name } = values;
    let editedDep = {
      name: name,
      icon: state.imageUrl
        ? state.imageUrl
        : departmentData.get_department.icon,
      id: id,
    };
    // console.log(editedDep);
    edit_department({
      variables: editedDep,
    }).then(async (res) => {
      await departmentRefetch();
      await message.success(res.data.edit_department.message);
      await history.push("/admin/departments");
    });
  };

  if (departmentLoading) {
    return (
      <center style={{ marginTop: "100px" }}>
        <Spin size="large" />
      </center>
    );
  }
  return (
    <div>
      <h1>Edit Department</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: departmentData.get_department.name,
          icon: departmentData.get_department.icon,
        }}
      >
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
            defaultFileList={[
              {
                name: departmentData.get_department.icon,
                // === response for onremove when user remove image
                response: departmentData.get_department.icon,
                url:
                  "htttp://localhost:5000/public/upload" +
                  departmentData.get_department.logo,
              },
            ]}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onRemove={onRemove}
          >
            <div className="upload-frame">
              {state.imageUrl ? (
                <img
                  width="80"
                  height="45"
                  src={`http://localhost:5000/public/upload/images/${state.imageUrl}`}
                  alt="uploaed logo"
                />
              ) : defaultImg ? (
                <img
                  height="45"
                  width="80"
                  src={`http://localhost:5000/public/upload/images/${departmentData.get_department.icon}`}
                  alt="department's icon"
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button id="submit-btn" type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditDepartment;
