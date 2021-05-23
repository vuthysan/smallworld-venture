import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_OPPORTUNITIES } from "../../../graphql/query";
import { DELETE_OPPORTUNITY } from "../../../graphql/mutation";
import { Spin, Table, Tag, Divider, Popconfirm, message } from "antd";
import { BsTrash, BsPencil } from "react-icons/bs";
function Opportunities() {
  const { loading, data, refetch } = useQuery(GET_OPPORTUNITIES);
  const [delete_opportunity] = useMutation(DELETE_OPPORTUNITY);
  // === Table management ===
  const columns = [
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) => {
        return data ? (
          <div style={{ backgroundColor: "#16e516" }} className="status"></div>
        ) : (
          <div style={{ backgroundColor: "red" }} className="status"></div>
        );
      },
    },
    {
      title: "Responsibilities",
      dataIndex: "responsibilities",
      render: (data) => data[0].substring(0, 10) + "...",
    },
    {
      title: "Requirements",
      dataIndex: "requirements",
      render: (data) => data[0].substring(0, 10) + "...",
    },
    {
      title: "Conditions",
      dataIndex: "conditions",
      render: (data) => data[0].substring(0, 10) + "...",
    },
    {
      title: "Company",
      dataIndex: "companyName",
      render: (data) => {
        return data.toUpperCase();
      },
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (data) => (data === null ? "null" : data.name),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, data) => {
        const { id } = data;
        return (
          <div>
            <Link to={`/admin/edit-opportunity/${id}`}>
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
              onConfirm={() => {
                // === delete opportunity from database ===as
                delete_opportunity({
                  variables: { id: id },
                }).then(async (res) => {
                  await refetch();
                  await message.success(res.data.delete_opportunity.message);
                });
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

  // === loading data from database ===
  if (loading) {
    return (
      <center style={{ marginTop: "100px" }}>
        <Spin size="large" />
      </center>
    );
  }
  return (
    <div>
      <h1>Opportunities</h1>
      <Table
        columns={columns}
        dataSource={data.get_opportunities}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}

export default Opportunities;
