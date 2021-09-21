import React, { useContext, useState } from "react";
import UserContext from "../../../context/userContext";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB, GET_USER } from "../../../graphql/query";
import { POST_APPLICATION } from "../../../graphql/mutation";
import { Divider, Spin, Form, Input, Button, message } from "antd";
function ApplyNow() {
  const { id } = useRouter().query;
  const { user } = useContext(UserContext);
  const [submitState, setSubmit] = useState(false);

  //   ===== post application function ===
  const [postApp] = useMutation(POST_APPLICATION);

  // === get job by id ===
  const { loading: jobLoading, data: jobData } = useQuery(GET_JOB, {
    variables: { id },
  });

  // === get seeker info ===
  const { loading: userLoading, data: userData } = useQuery(GET_USER, {
    variables: { id: user && user.id },
  });

  if (jobLoading || userLoading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  const onFinish = (values) => {
    const application = {
      jobId: id,
      userId: userData.get_user.id,
      name: userData.get_user.name,
      email: userData.get_user.email,
      gender: userData.get_user.gender,
      phone: userData.get_user.phone,
      additional: values.additional ? values.additional : "",
    };
    console.log(application);
    postApp({
      variables: application,
    })
      .then(async (res) => {
        await setSubmit(true);
        await message.success(res.data.post_application.message);
        await setSubmit(false);
        await window.location.replace("/open-opportunities");
      })
      .catch((err) => console.log(err));
  };

  // === check if user aleady applied for this job or not ===
  let applied;
  jobData.get_job.applicants.forEach((res) => {
    res.userId == user.id ? (applied = true) : (applied = false);
  });

  return (
    <div className="opp-container apply-job">
      <Divider orientation="left">Submit Your Application</Divider>
      {jobData && (
        <>
          <h2 className="">{jobData.get_job.position}</h2>
          <p> {jobData.get_job.company_name.toUpperCase()}</p>
        </>
      )}

      <p className="apply-note">
        Please update your CV/Resume and Contact in{" "}
        <a href={`/open-opportunities/profile`}>Profile</a>
        before apply!
      </p>

      <Form onFinish={onFinish}>
        <Form.Item label="Additional Information" name="additional">
          <Input.TextArea placeholder="Input additional information...(optional)" />
        </Form.Item>

        <center>
          {/* ===== check if user have cv yet or not ===== */}
          <Form.Item>
            {user && applied ? (
              <Button
                id="apply-btn"
                onClick={() =>
                  message.warn("You already applied for this job!")
                }
              >
                Submit Application
              </Button>
            ) : userData.get_user.cv ? (
              <Button
                id="apply-btn"
                type="primary"
                htmlType="submit"
                loading={submitState}
              >
                Submit Application
              </Button>
            ) : (
              <Button
                id="apply-btn"
                onClick={() =>
                  message.error(
                    "Please upload your CV/Resume and Contact before apply!"
                  )
                }
              >
                Submit Application
              </Button>
            )}
          </Form.Item>
        </center>
      </Form>
    </div>
  );
}

export default ApplyNow;
