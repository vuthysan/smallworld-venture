import React, { useEffect } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "../context/auth";
import Layout from "../comps/Layout/Layout";
import "antd/dist/antd.css";
import "../styles/globals.css";
import axios from "axios";
import client from "../apollo-client";
import "aos/dist/aos.css";
import AOS from "aos";

axios.defaults.withCredentials = true;
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>
          SmallWorld Venture | Homegrown startup community based in Phnom Penh
        </title>
        <link rel="shortcut icon" href="/images/home/favicon.png" />
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
