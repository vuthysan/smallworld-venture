import React from "react";
import jwt from "jsonwebtoken";
import Cookie from "js-cookie";
import { Route, Redirect } from "react-router-dom";

const token = Cookie.get("swtoken");
let decoded = jwt.decode(token);

function PrivateRoute({ component: Component, ...rest }) {
  const isLogin = () => {
    if (decoded) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
