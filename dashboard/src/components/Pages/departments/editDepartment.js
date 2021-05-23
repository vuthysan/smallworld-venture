import React from "react";
import { useParams } from "react-router-dom";
function EditDepartment() {
  const { id } = useParams();
  return (
    <div>
      <h1>Edit Department</h1>
      <p>{id}</p>
    </div>
  );
}

export default EditDepartment;
