import React from "react";
import Cookie from "js-cookie";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, restricted, ...rest }) {
  // console.log(restricted);
  const token = Cookie.get("swtoken");
  const isLogin = () => {
    if (!token) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
