
import { memo } from "react";
function NoFound() {
  return (
    <div
      className="columns-5 gap-x-2-3 mt-6 mx-40"
      style={{ columnFill: "auto" }}
     
    >
          <img src="@/assets/image/empty.png"/>
          <span>暂无数据</span>
    </div>
  );
}
export default memo(
NoFound
)
