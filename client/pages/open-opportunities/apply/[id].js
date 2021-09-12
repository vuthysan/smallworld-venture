import React, { useContext, useState } from "react";
import UserContext from "../../../context/userContext";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB, GET_JOBSEEKER } from "../../../graphql/query";
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
  const { loading: seekerLoading, data: seekerData } = useQuery(GET_JOBSEEKER, {
    variables: { id: user && user.id },
  });

  if (jobLoading || seekerLoading) {
    return (
      <center className="loading-data">
        <Spin size="large" />
      </center>
    );
  }

  const onFinish = (values) => {
    const application = {
      additional: values.additional ? values.additional : "",
      jobId: id,
      jobseekerId: seekerData.get_jobseeker.id,
      name: seekerData.get_jobseeker.name,
      email: seekerData.get_jobseeker.email,
      cv: seekerData.get_jobseeker.cv,
      gender: seekerData.get_jobseeker.gender,
      phone: seekerData.get_jobseeker.phone,
    };
    // console.log(application);
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
  return (
    <div className="opp-container apply-job">
      <Divider orientation="left">Submit Your Application</Divider>
      {jobData && (
        <>
          <h2 className="">{jobData.get_job.position}</h2>
          <p> {jobData.get_job.company_name.toUpperCase()}</p>
        </>
      )}
      <Form onFinish={onFinish}>
        <Form.Item label="Additional Information" name="additional">
          <Input.TextArea placeholder="Input additional information...(optional)" />
        </Form.Item>
        <center>
          <p className="apply-note">
            Please upload your CV/Resume in{" "}
            <a href={`/open-opportunities/jobseeker/profile/${user.id}`}>
              Profile
            </a>
            before apply!
          </p>
        </center>
        <center>
          {/* ===== check if user have cv yet or not ===== */}
          <Form.Item>
            {seekerData.get_jobseeker.cv ? (
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
                  message.warn("Please upload your cv before apply!")
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
