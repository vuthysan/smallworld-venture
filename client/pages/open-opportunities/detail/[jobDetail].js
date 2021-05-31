import { useRouter } from "next/router";
import { GET_OPPORTUNITY } from "../../../graphql/query";
import { useQuery } from "@apollo/client";
// === code splitting for performance ===
import loadable from "@loadable/component";
const ApplyNow = loadable(() => import("../../../comps/ApplyNow"));

import { Timeline, Spin } from "antd";

function JobDetail() {
  // === get opportunity id from url ===
  const router = useRouter();
  const { jobDetail } = router.query;
  // console.log(jobDetail);

  // == grapql query ===
  const { loading, data } = useQuery(GET_OPPORTUNITY, {
    variables: { id: jobDetail },
  });

  if (loading || !data) {
    return (
      <div>
        <center id="loading">
          <Spin size="large" />
        </center>
      </div>
    );
  }
  const {
    id,
    position,
    requirements,
    conditions,
    responsibilities,
    companyName,
    department,
  } = data.get_opportunity;

  return (
    <div className="job-detail">
      <div className="container">
        <div key={id}>
          <h1>{`${position} - ${companyName.toUpperCase()}`}</h1>
          <div className="line"></div>
          <h2>Responsibilities</h2>
          <Timeline>
            {responsibilities.map((resp, i) => {
              return (
                <Timeline.Item key={i}>
                  <p>{resp}</p>
                </Timeline.Item>
              );
            })}
          </Timeline>
          <h2>Requirements</h2>
          <Timeline>
            {requirements.map((resp, i) => {
              return (
                <Timeline.Item key={i}>
                  <p>{resp}</p>
                </Timeline.Item>
              );
            })}
          </Timeline>
          <h2>Conditions</h2>
          <Timeline>
            {conditions.map((resp, i) => {
              return (
                <Timeline.Item key={i}>
                  <p>{resp}</p>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>

        <img
          width="70px"
          height="140px"
          src="/images/open-opportunities/arrow-down.svg"
          alt="arrow down"
        />
        <br />
        {/*  === props for application form === */}
        <ApplyNow
          company={companyName}
          department={department.name}
          position={position}
        />
      </div>
    </div>
  );
}

export default JobDetail;
