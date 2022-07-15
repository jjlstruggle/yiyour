import { Layout } from "antd";
import Routes from "@/route/index";
const { Content } = Layout;
export default function Container() {
  return (
    <Content>
      <Routes />
    </Content>
  );
}
