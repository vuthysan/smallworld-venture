import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMPANIES } from "../../../graphql/query";
import { DELETE_COMPANY } from "../../../graphql/mutation";
import axios from "axios";
import moment from "moment";
import { Row, Col, Table, Spin, Tag, Divider, Popconfirm, message } from "antd";

// === comps ===
import AppLayout from "../../Layout/Layout";

import { BsTrash, BsPencil } from "react-icons/bs";

function Companies() {
  const { loading, data, refetch } = useQuery(GET_COMPANIES);
  const [delete_company] = useMutation(DELETE_COMPANY);

  // console.log(data);

  // === table data management ===
  const columns = [
    {
      title: "Logo",
      width: 200,

      dataIndex: "logo",
      render: (data) => {
        return (
          <img
            // height="auto"
            height="33"
            width="100"
            src={`http://localhost:5000/public/upload/images/${data}`}
            alt="logo"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      key: "id",
      dataIndex: "description",
      render: (data) => {
        return data.length <= 25 ? data : data.substring(0, 25) + "...";
      },
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
        const { id, logo } = data;
        return (
          <div>
            <Link to={`/admin/edit-company/${id}`}>
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
                // === delete company from database ===
                delete_company({ variables: { id: `${id}` } })
                  .then(async (res) => {
                    await refetch();
                    await message.success(res.data.delete_company.message);
                  })
                  .catch((error) => {
                    console.log(error);
                    return null;
                  });
                // === delete image from public/upload folder in server ===
                await axios.delete(
                  "http://localhost:5000/image/delete/" + logo
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
        <Spin size="large" />
      </center>
    );
  }
  return (
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <h1>Companies</h1>
        </Col>
        <Col>
          <h1>{data.get_companies.length}</h1>
        </Col>
      </Row>
      <div>
        <Table
          columns={columns}
          pagination={{ pageSize: 10 }}
          dataSource={data.get_companies}
        />
      </div>
    </AppLayout>
  );
}

export default Companies;
