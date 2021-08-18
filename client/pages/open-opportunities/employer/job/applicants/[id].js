import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB } from "../../../../../graphql/query";
import { DELETE_APPLICATION } from "../../../../../graphql/mutation";
import { Divider, Table, Modal, Popconfirm, message, Spin } from "antd";
import moment from "moment";

function Applicants() {
  const { id } = useRouter().query;

  const [seekerModal, setModal] = useState({
    visible: false,
    id: null,
  });

  // === delete seeeker's application graphql function ===
  const [deleteApp] = useMutation(DELETE_APPLICATION);

  const handleDelete = (id) => {
    deleteApp({
      variables: { id },
    })
      .then(async (res) => {
        await message.success(res.data.delete_application.message);
        await refetch();
      })
      .catch((err) => console.log(err));
  };

  // === get job by job id ===
  const { loading, data, refetch } = useQuery(GET_JOB, {
    variables: { id: id && id },
  });

  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CV/Resume",
      dataIndex: "cv",
      key: "cv",
      render: (data) => {
        return (
          <button className="applicant-btn blue">
            <a target="_blank" href={"/open-opportunities/pdf/" + data}>
              View PDF
            </a>
          </button>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Applied Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => {
        return moment.unix(data / 1000).format("MM-DD-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (_, apps) => {
        const { id } = apps;

        return (
          <>
            <button
              onClick={() => setModal({ visible: true, id: id })}
              className="applicant-btn blue"
            >
              <a href="#">View</a>
            </button>
            {data.get_job.applicants.map((res) => {
              const { id, name, cv, email, gender, phone, additional } = res;

              if (id === seekerModal.id) {
                return (
                  <Modal
                    key={id}
                    footer={null}
                    width={700}
                    visible={seekerModal.visible}
                    onCancel={() => setModal({ visible: false })}
                  >
                    <p>
                      <span className="applicants-detail">{`Name: `}</span>
                      {name.toUpperCase()}
                    </p>
                    <p>
                      <span className="applicants-detail">{`Email: `}</span>
                      {email}
                    </p>
                    <p>
                      <span className="applicants-detail">{`Gender: `}</span>
                      {gender}
                    </p>
                    <p>
                      <span className="applicants-detail">{`Phone: `}</span>
                      {phone}
                    </p>
                    {additional && (
                      <p>
                        <span className="applicants-detail">{`Additional: `}</span>
                        {additional}{" "}
                      </p>
                    )}

                    <a
                      id="download-cv"
                      target="_blank"
                      rel="noreferrer"
                      href={`http://localhost:5000/public/upload/pdf/${cv}`}
                    >
                      Download CV/Resume
                    </a>
                  </Modal>
                );
              }
            })}
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => handleDelete(id)}
              okText="Yes"
              cancelText="No"
            >
              <button className="applicant-btn red">
                <a href="#">Delete</a>
              </button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <div className="opp-container opp-big-container">
      {data && (
        <>
          <Divider orientation="left">
            {`${
              data.get_job.position
            } (${data.get_job.company_name.toUpperCase()})`}
          </Divider>
          <Table
            pagination={{ pageSize: 10 }}
            columns={columns}
            dataSource={data.get_job.applicants}
          />
        </>
      )}
    </div>
  );
}

export default Applicants;
