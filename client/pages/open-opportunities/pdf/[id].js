import React from "react";

function ViewPDF() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        zIndex: 2,
      }}
    >
      <object
        //   data={`http://localhost:5000/public/upload/pdf/${res.cv}`}
        data="/images/sample.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
        aria-labelledby="pdf viewer"
      />
    </div>
  );
}

export default ViewPDF;
