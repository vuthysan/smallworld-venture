import React, { useState } from "react";
import { GET_APPLICATION } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import { Modal } from "antd";
function PdfModal() {
  const [visible, setVisible] = useState(true);

  const { loading, data } = useQuery(GET_APPLICATION, {
    variables: { id: "sdf" },
  });
  if (loading) {
    return <h1>loading</h1>;
  }
  console.log(data);
  return (
    <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
      <h1>Hello</h1>
    </Modal>
  );
}

export default PdfModal;
