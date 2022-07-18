import Container from "@/components/layout/content";
import Foot from "@/components/layout/footer";
import Head from "@/components/layout/header";
import "@/styles/layout.less";
export default function PageLayout() {
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto block">
      <Head />
      <Container />
      <Foot />
    </div>
  );
}
