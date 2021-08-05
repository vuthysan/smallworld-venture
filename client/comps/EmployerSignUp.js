import React, { useState } from "react";
import { Button, Form, Input, Select, Radio, message } from "antd";
// === comps ===
import SignFooter from "./Layout/SignFooter";
import RegisterEmployer from "./RegisterEmployer";
import EmployerNewCompany from "./EmployerNewCompany";
const { Option } = Select;

function EmployerSignUp() {
  const [form] = Form.useForm();

  // === steps state ===
  const [current, setCurrent] = useState(0);

  // === add new company need employerId ===
  const [employerId, setId] = useState("");

  // === steps function ===
  const next = () => {
    setCurrent(current + 1);
  };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  const onFinishCom = (values) => {
    console.log({
      ...values,
      employerId,
      website: values.website ? values.website : "N/A",
    });
  };
  const steps = [
    {
      content: (
        // === nextContext for move to next step (add company steps) ===
        // === setEmployerId for add new company (need employerid) ===
        <RegisterEmployer
          nextContent={() => next()}
          setEmployerId={(id) => setId(id)}
        />
      ),
    },
    {
      content: <EmployerNewCompany employerId={employerId} />,
    },
  ];
  return (
    <center>
      <h1 style={{ marginTop: "25px" }}>Sign Up As Employer</h1>
      <div className="steps-content">{steps[current].content}</div>
      <SignFooter />
    </center>
  );
}

export default EmployerSignUp;
