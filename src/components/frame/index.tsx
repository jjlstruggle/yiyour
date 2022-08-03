import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("1", "1", <PieChartOutlined />),
  getItem("2", "2", <DesktopOutlined />),
  getItem("3", "sub1", <UserOutlined />),
  getItem("4", "sub2", <TeamOutlined />),
  getItem("5", "9", <FileOutlined />),
];

const AdminFrame: React.FC = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        ></Header>
        <Content
          style={{
            margin: "0 16px",
            padding: "4vh 5vw",
            backgroundColor: "#FFFF",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>admin</Breadcrumb.Item>
            <Breadcrumb.Item>
              {props.children.props.children.props.path}
            </Breadcrumb.Item>
          </Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminFrame;
