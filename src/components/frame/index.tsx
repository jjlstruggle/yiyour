import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  AreaChartOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
type MenuToRoute = {
  [propName: string]: string;
};

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
  getItem("统计面板", "1", <PieChartOutlined />),
  getItem("操作面板", "2", <DesktopOutlined />),
  getItem("用户管理", "3", <UserOutlined />),
  getItem("组织管理", "4", <TeamOutlined />),
  getItem("订单管理", "5", <FileOutlined />),
  getItem("作品管理", "6",<AreaChartOutlined />),
];
  // 菜单标签的key值映射到路由
  const menuToRoute: MenuToRoute = {
    "1": "/console/statics",
    "2": "/console/operator",
    "3": "/console/user",
    "4": "/console/organize",
    "5": "/console/order",
    "6": "/console/works",
  };
    // 菜单标签点击事件

const AdminFrame: React.FC = (props: any) => {
  const  navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const onClick: MenuProps["onClick"] = (e) => {
      const { key } = e;
      const path = menuToRoute[key];
      navigate(path);
    };
  return (
    <Layout style={{ minHeight: "135vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          // defaultOpenKeys={["1"]}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClick}
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
            <Breadcrumb.Item>控制台</Breadcrumb.Item>
            <Breadcrumb.Item>
              {props.children.path}
            </Breadcrumb.Item>
          </Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminFrame;
