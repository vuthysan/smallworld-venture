import React from "react";
import { Layout } from "antd";

// === comps ===
import LeftNav from "./LeftNav";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

const { Content } = Layout;
function AppLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LeftNav />
      <Layout>
        <TopNavbar />
        <Content className="content">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
