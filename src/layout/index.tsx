import Container from "@/components/layout/content";
import Foot from "@/components/layout/footer";
import Head from "@/components/layout/header";
import "@/styles/layout.less";
import { Ref, useEffect, useRef, useState } from "react";
export default function PageLayout() {
  const header: Ref<HTMLDivElement> = useRef(null);
  const footer: Ref<HTMLDivElement> = useRef(null);
  const [heightInfo, setHeightInfo] = useState({
    wh: 0,
    headerHeight: 0,
    footerHeight: 0,
  });
  useEffect(() => {
    const wh = document.body.clientHeight; // 总高
    const headerHeight = header.current?.clientHeight!; // 头部高度
    const footerHeight = footer.current?.clientHeight!; // 底部高度
    setHeightInfo({ wh, headerHeight, footerHeight });
  }, []);
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto block">
      <Head ref={header} />
      <Container heightInfo={heightInfo} />
      <Foot ref={footer} />
    </div>
  );
}
