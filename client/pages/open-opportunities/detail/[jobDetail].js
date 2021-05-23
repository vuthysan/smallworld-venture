import { useRouter } from "next/router";

// === code splitting for performance ===
import loadable from "@loadable/component";
const ApplyNow = loadable(() => import("../../../comps/ApplyNow"));

import departmentList from "../../../data/open-page-data/departmentList.json";
import jobList from "../../../data/open-page-data/jobList.json";
import { Timeline } from "antd";

function JobDetail() {
  // === get opportunity id from url ===
  const { query } = useRouter();
  const id = query.jobDetail;

  // === filter an opportunity by url id ===
  const detail = jobList.filter((job) => job.id.toString() === id);

  return (
    <div className="job-detail">
      <div className="container">
        {detail.map((res) => {
          const {
            id,
            company,
            position,
            responsibilities,
            requirements,
            conditions,
          } = res;
          return (
            <div key={id}>
              <h1>{`${position} - ${company.toUpperCase()}`}</h1>
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
          );
        })}
        <img
          width="70px"
          height="140px"
          src="/images/open-opportunities/arrow-down.svg"
          alt="arrow down"
        />
        <br />
        <ApplyNow />
      </div>
    </div>
  );
}

export default JobDetail;
