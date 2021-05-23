import React from "react";
import { useParams } from "react-router-dom";
function EditOpportunity() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Opportunity</h1>
      <p>{id}</p>
    </div>
  );
}

export default EditOpportunity;
