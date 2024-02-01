import React from "react";
function CheckSignIn({ token }) {
  return (
    <React.Fragment>
      {token !== "" ? (
        <a href="#joblist">
          <button className="opportunities-btn view-openning">
            View Openning
          </button>
        </a>
      ) : (
        <>
          {" "}
          <a href="/open-opportunities/signin">
            <button className="opportunities-btn">Sign In</button>
          </a>
          <a href="/open-opportunities/signup">
            <button className="opportunities-btn"> Sign Up</button>
          </a>
        </>
      )}
    </React.Fragment>
  );
}

export default CheckSignIn;
