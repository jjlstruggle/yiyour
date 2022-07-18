import useMounted from "@/hooks/useMounted";
import Routes from "@/route/index";
import { useState } from "react";
interface ContainerProps {
  heightInfo: {
    wh: number;
    headerHeight: number;
    footerHeight: number;
  };
}

function Container({ heightInfo }: ContainerProps) {
  const [minHeight, setMinHeight] = useState(0);
  useMounted(() => {
    setMinHeight(
      heightInfo.wh - heightInfo.footerHeight - heightInfo.headerHeight
    );
  });
  return (
    <div style={{ minHeight }}>
      <Routes />
    </div>
  );
}

export default Container;
