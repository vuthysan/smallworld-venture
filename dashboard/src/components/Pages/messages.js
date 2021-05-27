import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../../graphql/query";
import { DELETE_MESSAGE } from "../../graphql/mutation";
import moment from "moment";
import { Table, Spin, Button, Divider, Modal, Popconfirm, message } from "antd";

function Messages() {
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
            <Button
              className="action-btn"
              onClick={() => setMessageModal({ visible: true, msgId: id })}
              style={{ backgroundColor: "#38c838" }}
            >
              View
            </Button>
            <Modal
              visible={messageModal.visible}
              onCancel={() => setMessageModal({ visible: false })}
            >
              {msgData.get_messages.map((res) => {
                if (res.id === messageModal.msgId) {
                  return (
                    <div key={res.id}>
                      <p>{res.fullname}</p>
                      <p>{res.email}</p>
                      <p>{res.message}</p>
                    </div>
                  );
                }
              })}
            </Modal>
            {/* <MessageModal
              modal={messageModal}
              setVisible={setModalVisibility}
            /> */}
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
              <Button className="action-btn" style={{ backgroundColor: "red" }}>
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
    <div>
      <h1>Messages</h1>
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={msgData.get_messages}
      />
    </div>
  );
}

export default Messages;
