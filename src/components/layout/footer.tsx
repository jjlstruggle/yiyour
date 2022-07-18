import { Divider } from "antd";
import { ForwardedRef, forwardRef, memo } from "react";

function Foot({
  footContainer,
}: {
  footContainer: ForwardedRef<HTMLDivElement>;
}) {
  return (
    <div className="px-40 bg-main py-8" ref={footContainer}>
      <div className="flex">
        <div>
          <div>特征</div>
          <div className="text-gray-300"></div>
        </div>
        <div>
          <div>解决方案</div>
          <div className="text-gray-300"></div>
        </div>
        <div>
          <div>资源</div>
          <div className="text-gray-300"></div>
        </div>
        <div>
          <div>一隅立画</div>
          <div className="text-gray-300"></div>
        </div>
      </div>
      <Divider />
      <div className="text-gray-300">http://www.yiyulihua.com/</div>
    </div>
  );
}

export default memo(
  forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => (
    <Foot {...props} footContainer={ref} />
  ))
);
