import React from "react";
import { Divider, Table, Button, Modal, Popconfirm, message } from "antd";
const tableData = [
  {
    name: "Sea Viseth",
    cv: "",
    email: "seaviseth@gmail.com",
    gender: "Male",
    createdAt: "July, 19th 2021",
  },
  {
    name: "Tep Theavy",
    cv: "",
    email: "theavy@gmail.com",
    gender: "Female",
    createdAt: "July, 20th 2021",
  },
];
function Applicants() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "CV/Resume",
      dataIndex: "cv",
      render: (data) => {
        return (
          <button className="applicant-btn blue">
            <a target="_blank" href="/open-opportunities/pdf/1">
              View PDF
            </a>
          </button>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    { title: "Gender", dataIndex: "gender" },
    {
      title: "Applied Date",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (data) => {
        return (
          <>
            <button className="applicant-btn blue">View</button>
            <button className="applicant-btn red ">Delete</button>
          </>
        );
      },
    },
  ];
  return (
    <div style={{ height: "100%" }} className="opp-container opp-big-container">
      <Divider orientation="left">Applicants</Divider>
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
}

export default Applicants;
