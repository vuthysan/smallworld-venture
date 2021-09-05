import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYER_COMPANIES } from "../../../../graphql/query";
import { DELETE_COMPANY } from "../../../../graphql/mutation";
import { Divider, Row, Col, Spin, Popconfirm, message } from "antd";
import { TiDeleteOutline } from "react-icons/ti";
import moment from "moment";
function companies() {
  const { id } = useRouter().query;

  // === delete company function ===
  const [deleteCom] = useMutation(DELETE_COMPANY);

  function confirmDelete(id, name) {
    deleteCom({
      variables: { id, name },
    })
      .then(async (res) => {
        await refetch();
        await message.success(res.data.delete_company.message);
      })
      .catch((err) => console.log(err));
  }
  //   === get employer by id ===
  const { loading, data, refetch } = useQuery(GET_EMPLOYER_COMPANIES, {
    variables: { id: id && id },
  });

  if (loading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  return (
    <div className="opp-container opp-big-container">
      <Divider orientation="left">Companies</Divider>
      {data && data.get_employer.companies.length < 1 ? (
        <center>No data</center>
      ) : (
        <Row className="outter-card" gutter={[12, 12]}>
          {data &&
            data.get_employer.companies.map((res) => {
              const { id, name, createdAt, city, logo } = res;
              return (
                <Col key={id} md={6}>
                  <div className="com-card">
                    {/* === delete compny === */}
                    <Popconfirm
                      title="Are you sure to delete this job?"
                      onConfirm={() => confirmDelete(id, name)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#" id="delete_company">
                        <TiDeleteOutline />
                      </a>
                    </Popconfirm>
                    <div className="img">
                      <img
                        height="60"
                        src={
                          "https://backend.smallworldventure.com/public/upload/images/" +
                          logo
                        }
                        alt="company logo"
                      />
                    </div>
                    <p>
                      <span className="content">Name:</span>
                      {name}
                    </p>
                    <p>
                      <span className="content">City:</span>
                      {city}
                    </p>
                    <p>
                      <span className="content">Added Date:</span>
                      {moment.unix(createdAt / 1000).format("YYYY-MM-DD")}
                    </p>
                    <button className="view-btn">
                      <a href={"/open-opportunities/employer/company/" + id}>
                        View Company
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

export default companies;
