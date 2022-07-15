import Container from "@/components/layout/content";
import Foot from "@/components/layout/footer";
import Head from "@/components/layout/header";
import { Layout } from "antd";
export default function PageLayout() {
  return (
    <Layout>
      <Head />
      <Container />
      <Foot />
    </Layout>
  );
}
