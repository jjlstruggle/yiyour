import { Divider } from "antd";
import { ForwardedRef, forwardRef, memo } from "react";
import Item from "./item";

const footData = [
  {
    title: "特征",
    item: [
      {
        content: "这里是特征列表",
        url: "",
      },
      { content: "一杯浅淡的清茶", url: "" },
      { content: "这里是特征列表", url: "" },
    ],
  },
  {
    title: "解决方案",
    item: [
      {
        content: "这里是特征列表",
        url: "",
      },
      { content: "一杯浅淡的清茶", url: "" },
      { content: "这里是特征列表", url: "" },
    ],
  },
  {
    title: "资源",
    item: [
      {
        content: "这里是特征列表",
        url: "",
      },
      { content: "一杯浅淡的清茶", url: "" },
      { content: "这里是特征列表", url: "" },
    ],
  },
];

function Foot({
  footContainer,
}: {
  footContainer: ForwardedRef<HTMLDivElement>;
}) {
  return (
    <div className="px-40 bg-main py-8" ref={footContainer}>
      <div className="flex">
        {footData.map((item, index) => (
          <Item mainTitle={item.title} key={index} item={item.item} />
        ))}
        <div>
          <div className="text-base text-white mb-2 font-bold">一隅立画</div>
          <div className="text-gray-300 my-1"></div>
        </div>
      </div>
      <Divider className="border-white  " />
      <div className="text-gray-300">http://www.yiyulihua.com/</div>
    </div>
  );
}

export default memo(
  forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => (
    <Foot {...props} footContainer={ref} />
  ))
);
