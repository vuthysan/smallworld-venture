import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../../graphql/query";
import { DELETE_MESSAGE } from "../../graphql/mutation";
import moment from "moment";
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

// === comps ===
import AppLayout from "../Layout/Layout";

function Messages() {
  // === massage's modal state ===
  const [messageModal, setMessageModal] = useState({
    visible: false,
    msgId: null,
  });

  const { loading, data: msgData, refetch } = useQuery(GET_MESSAGES);
  const [delete_message] = useMutation(DELETE_MESSAGE);
  // console.log(data);

  // ==== table management ====
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (data) => {
        return data.substring(0, 20) + "...";
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
      render: (_, data) => {
        const { id } = data;
        // console.log(data);
        return (
          <div>
            {/* == set Id of message to modal state when click == */}
            <Button
              className="action-btn"
              onClick={() => setMessageModal({ visible: true, msgId: id })}
              style={{ backgroundColor: "rgba(60, 192, 60, 0.68)" }}
            >
              View
            </Button>
            <Modal
              visible={messageModal.visible}
              footer={null}
              width={1000}
              onCancel={() => setMessageModal({ visible: false })}
            >
              {msgData.get_messages.map((res) => {
                if (res.id === messageModal.msgId) {
                  return (
                    <div key={res.id}>
                      <h2>
                        <span className="view-msg-label">{`Full Name: `}</span>
                        {res.fullname}
                      </h2>
                      <h2>
                        <span className="view-msg-label">{`Email: `}</span>
                        {res.email}
                      </h2>
                      <h2>
                        <span className="view-msg-label">{`Message: `}</span>
                        {res.message}
                      </h2>
                    </div>
                  );
                } else {
                  return "";
                }
              })}
            </Modal>

            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                delete_message({
                  variables: { id: id },
                }).then(async (res) => {
                  await refetch();
                  await message.success(res.data.delete_message.respond);
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
    <AppLayout>
      <Row justify="space-between">
        <Col>
          <h1>Messages</h1>
        </Col>
        <Col>
          <h1>{msgData.get_messages.length}</h1>
        </Col>
      </Row>
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={msgData.get_messages}
      />
    </AppLayout>
  );
}

export default Messages;
