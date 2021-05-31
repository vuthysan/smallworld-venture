import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_APPLICATIONS } from "../../graphql/query";
import { DELETE_APPLICATION } from "../../graphql/mutation";
import {
  Row,
  Col,
  Table,
  Spin,
  Button,
  Divider,
  Modal,
  Popconfirm,
  message,
} from "antd";

// ==== comps ====
import AppLayout from "../Layout/Layout";

function Applications() {
  // === pdf modal state ===
  const [pdfModal, setPdfModal] = useState({
    visible: false,
    pdf: null,
  });
  // === application modal state ===
  const [applicationModal, setApplicationModal] = useState({
    visible: false,
    id: null,
  });

  const {
    loading,
    data: applicationData,
    refetch,
  } = useQuery(GET_APPLICATIONS);
  const [delete_application] = useMutation(DELETE_APPLICATION);

  // === table management ===
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Addtional Info",
      dataIndex: "additional",
      render: (data) => {
        return data.substring(15, 0) + "...";
      },
    },
    {
      title: "PDF",
      dataIndex: "cv",
      render: (data) => {
        console.log(data);
        return (
          <>
            <Button
              className="action-btn"
              style={{ backgroundColor: "rgba(60, 192, 60, 0.68)" }}
              onClick={() => setPdfModal({ visible: true, pdf: data })}
            >
              View PDF
            </Button>
            {applicationData.get_applications.map((res) => {
              if (res.cv === pdfModal.pdf) {
                return (
                  <Modal
                    footer={null}
                    width="60%"
                    style={{ top: 20 }}
                    visible={pdfModal.visible}
                    onCancel={() => setPdfModal({ visible: false })}
                  >
                    <object
                      data={`http://localhost:5000/public/upload/pdf/${res.cv}`}
                      type="application/pdf"
                      width="98%"
                      height="800px"
                      aria-labelledby="pdf viewer"
                    />
                  </Modal>
                );
              } else {
                return "";
              }
            })}
          </>
        );
      },
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, data) => {
        const { id } = data;
        return (
          <>
            <Button
              className="action-btn"
              style={{ backgroundColor: "rgba(60, 192, 60, 0.68)" }}
              onClick={() => setApplicationModal({ visible: true, id: id })}
            >
              View
            </Button>
            {applicationData.get_applications.map((res) => {
              if (res.id === applicationModal.id) {
                return (
                  <Modal
                    footer={null}
                    width={1000}
                    visible={applicationModal.visible}
                    onCancel={() => setApplicationModal({ visible: false })}
                  >
                    <h2>
                      <span className="view-application-label">{`Name: `}</span>
                      {res.name}
                    </h2>
                    <h2>
                      <span className="view-application-label">{`Email: `}</span>
                      {res.email}
                    </h2>
                    <h2>
                      <span className="view-application-label">{`Phone: `}</span>
                      {res.phone}
                    </h2>

                    <h2>
                      <span className="view-application-label">{`Company: `}</span>
                      {res.company} |
                      <span className="view-application-label">{` Department: `}</span>
                      {res.department} |
                      <span className="view-application-label">{` Position: `}</span>
                      {res.position}
                    </h2>
                    <h2>
                      <span className="view-application-label">{`Additional Info: `}</span>
                      {res.additional}
                    </h2>
                    <br />
                    <a
                      id="download-cv"
                      target="_blank"
                      rel="noreferrer"
                      href={`http://localhost:5000/public/upload/pdf/${res.cv}`}
                    >
                      Download CV/Resume
                    </a>
                  </Modal>
                );
              } else {
                return "";
              }
            })}
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                delete_application({
                  variables: { id: id },
                }).then(async (res) => {
                  await refetch();
                  await message.success(res.data.delete_application.message);
                });
              }}
            >
              <Button
                className="action-btn"
                style={{ backgroundColor: "#ff0000a3" }}
              >
                Delete
              </Button>
            </Popconfirm>
          </>
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

  //   console.log(data);
  return (
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <h1>Applications</h1>
        </Col>
        <Col>
          <h1>{applicationData.get_applications.length}</h1>
        </Col>
      </Row>
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={applicationData.get_applications}
      />
    </AppLayout>
  );
}

export default Applications;
