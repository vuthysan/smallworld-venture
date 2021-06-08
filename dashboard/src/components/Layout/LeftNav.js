import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Menu } from "antd";

import {
  AppstoreOutlined,
  BankOutlined,
  ClusterOutlined, 
  FileSearchOutlined,
  MailOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;
function LeftNav() {
  const pathname = window.location.pathname;
  return (
    <React.Fragment>
      <Sider width={290} className="left-nav">
        <div className="logo">
          <Link to="/">
            <center>
              <img
                style={{ maxWidth: "60%" }}
                src="/images/sw-white.png"
                alt="img"
              />
            </center>
          </Link>
        </div>
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          mode="inline"
        >
          <Menu.Item key="/" icon={<AppstoreOutlined />}>
            <Link to="/" />
            Dashboard
          </Menu.Item>
          <SubMenu
            key={
              pathname === "/admin/companies"
                ? "/admin/companies"
                : "/admin/add-company"
            }
            icon={<BankOutlined />}
            title="Companies"
          >
            <Menu.Item key="/admin/companies">
              <Link to="/admin/companies" />
              Companies
            </Menu.Item>
            <Menu.Item key="/admin/add-company">
              <Link to="/admin/add-company" />
              Add Company
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key={
              pathname === "/admin/departments"
                ? "/admin/departments"
                : "/admin/add-department"
            }
            icon={<ClusterOutlined />}
            title="Departments"
          >
            <Menu.Item key="/admin/departments">
              <Link to="/admin/departments" />
              Deparments
            </Menu.Item>
            <Menu.Item key="/admin/add-department">
              <Link to="/admin/add-department" />
              Add Department
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key={
              pathname === "/admin/opportunities"
                ? "/admin/opportunities"
                : "/admin/add-opportunity"
            }
            icon={<FileSearchOutlined />}
            title="Opportunities"
          >
            <Menu.Item key="/admin/opportunities">
              <Link to="/admin/opportunities" />
              Opportunities
            </Menu.Item>
            <Menu.Item key="/admin/add-opportunity">
              <Link to="/admin/add-opportunity" />
              Add Opportunity
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/messages" icon={<MailOutlined />}>
            <Link to="/admin/messages" />
            Messages
          </Menu.Item>
          <Menu.Item key="/admin/applications" icon={<FileTextOutlined />}>
            <Link to="/admin/applications" />
            Applications
          </Menu.Item>
        </Menu>
      </Sider>
    </React.Fragment>
  );
}

export default LeftNav;
