import Container from "src/components/layout/content";
import Foot from "src/components/layout/footer";
import Head from "src/components/layout/header";
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
