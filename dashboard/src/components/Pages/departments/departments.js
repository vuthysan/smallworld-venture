import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DEPARTMENTS } from "../../../graphql/query";
import { DELETE_DEPARTMENT } from "../../../graphql/mutation";
import axios from "axios";
import moment from "moment";
import { Table, Spin, Tag, Popconfirm, Divider, message } from "antd";
import { BsTrash, BsPencil } from "react-icons/bs";

function Departments() {
  const { loading, data, refetch } = useQuery(GET_DEPARTMENTS);
  const [delete_department] = useMutation(DELETE_DEPARTMENT);
  // ==== table management ====
  const columns = [
    {
      title: "Icon",
      width: 200,
      dataIndex: "icon",
      render: (data, s) => {
        return (
          <img
            height="30"
            width="70"
            src={`http://localhost:5000/public/upload/${data}`}
            alt="icon of each department"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (data) => {
        return moment.unix(data / 1000).format(" Do YYYY, h:mm:ss A");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, data) => {
        const { id, icon } = data;

        return (
          <div>
            <Link to={`/admin/edit-department/${id}`}>
              <Tag className="edit-btn">
                <BsPencil
                  color="#1388d1"
                  size="20px"
                  style={{ marginTop: "6px" }}
                />
              </Tag>
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={async () => {
                // === delete department from database ===
                delete_department({ variables: { id: `${id}` } })
                  .then(async (res) => {
                    await refetch();
                    await message.success(res.data.delete_department.message);
                  })
                  .catch((error) => {
                    console.log(error);
                    return null;
                  });
                // === delete image from public/upload folder in server ===
                await axios.delete(
                  "http://localhost:5000/image/delete/" + icon
                );
              }}
            >
              <Tag className="delete-btn">
                <BsTrash
                  color="#ff5858"
                  size="20px"
                  style={{ marginTop: "6px" }}
                />
              </Tag>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  if (loading) {
    return (
      <center style={{ marginTop: "100px" }}>
        <Spin size="large"></Spin>
      </center>
    );
  }

  return (
    <div>
      <h1> Departments</h1>
      <Table
        pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={data.get_departments}
      />
    </div>
  );
}

export default Departments;
