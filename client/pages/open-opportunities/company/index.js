import React, { useContext } from "react";
import UserContext from "../../../context/userContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_COMPANIES } from "../../../graphql/query";
import { DELETE_COMPANY } from "../../../graphql/mutation";
import { Divider, Row, Col, Spin, Popconfirm, message, Empty } from "antd";
import { TiDeleteOutline } from "react-icons/ti";
import moment from "moment";
function companies() {
  const { user } = useContext(UserContext);
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
  const { loading, data, refetch } = useQuery(GET_USER_COMPANIES, {
    variables: { id: user && user.id },
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
      {data && data.get_user.companies.length < 1 ? (
        <center className="no-data">
          <Empty />
        </center>
      ) : (
        <Row className="outter-card" gutter={[12, 12]}>
          {data &&
            data.get_user.companies.map((res) => {
              const { id, name, createdAt, city, logo } = res;
              return (
                <Col key={id} xs={24} sm={12} md={12} lg={8} xxl={6}>
                  <div className="com-card">
                    {/* === delete compny === */}
                    <Popconfirm
                      title={() => (
                        <>
                          Delete this company will also delete jobs inside it.{" "}
                          <br /> Are you sure you want to delete this company?
                        </>
                      )}
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
                        // src={
                        //   "https://backend.smallworldventure.com/public/upload/images/" +
                        //   logo
                        // }
                        src={
                          "http://localhost:5000/public/upload/images/" + logo
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
                      <a href={"/open-opportunities/company/" + id}>
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
