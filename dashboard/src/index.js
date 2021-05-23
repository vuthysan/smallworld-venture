import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const admin = new ApolloClient({
  uri: "http://localhost:5000/admin",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={admin}>
    <App />
  </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
