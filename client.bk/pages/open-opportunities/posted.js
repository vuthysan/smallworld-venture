import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_POSTED_JOB } from "../../graphql/query";
import { DELETE_JOB } from "../../graphql/mutation";
import { Divider, Row, Col, Spin, Popconfirm, message, Empty } from "antd";
import { TiDeleteOutline } from "react-icons/ti";
import moment from "moment";

function posted() {
  // === delete job function ===
  const [deleteJob] = useMutation(DELETE_JOB);

  function confirm(id) {
    deleteJob({
      variables: { id },
    }).then(async (res) => {
      await refetch();
      await message.success(res.data.delete_job.message);
    });
  }

  //   === get employer posted job ===
  const { loading, data, refetch } = useQuery(GET_USER_POSTED_JOB);

  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Posted Job</Divider>
      {data && data.get_user.jobs.length < 1 ? (
        <center className="no-data">
          <Empty />
        </center>
      ) : (
        <Row className="outter-card" gutter={[12, 12]}>
          {data &&
            data.get_user.jobs.map((res) => {
              const { company, id, createdAt, position } = res;
              return (
                <Col key={id} xs={24} sm={24} md={12} lg={8} xxl={6}>
                  <div className="card">
                    <Popconfirm
                      title="Are you sure to delete this job?"
                      onConfirm={() => confirm(id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a id="delete_job" href="#">
                        <TiDeleteOutline />
                      </a>
                    </Popconfirm>
                    <p className="position">{position}</p>
                    <p className="company">{company.name.toUpperCase()}</p>
                    <p className="city">{company.city}</p>
                    <p className="city">
                      {moment.unix(createdAt / 1000).format("MMM-DD-YYYY")}
                    </p>
                    <button className="view-btn">
                      <a href={"/open-opportunities/job/" + id}>View Job</a>
                    </button>
                    <button className="view-btn">
                      <a href={"/open-opportunities/job/applicants/" + id}>
                        View Applicants
                      </a>
                    </button>
                  </div>
                </Col>
              );
            })}
        </Row>
      )}
    </div>
  );
}

export default posted;
