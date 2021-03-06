import { Divider } from "antd";
import { ForwardedRef, forwardRef, memo } from "react";
import { QqOutlined, WechatFilled, WeiboOutlined } from "@ant-design/icons";
import { FriendIcon } from "@/assets/svg";
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
      <div className="flex relative">
        {footData.map((item, index) => (
          <Item mainTitle={item.title} key={index} item={item.item} />
        ))}
        <div className="relative flex-1">
          <div className="text-base text-white mb-2 font-bold">一隅立画</div>
          <div className="text-gray-300 my-1">
            再繁华的落笔也不能尽数表达此刻似澎湃，似思念的心音。感觉我们是很老的朋友
            再繁华的落笔也不能尽数表达此刻似澎湃，似思念的心音。感觉我们是很老的朋友
          </div>
          <div className="absolute left-0 bottom-0 flex text-lg text-white">
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-yel cursor-pointer mr-4">
              <WechatFilled />
            </div>
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-yel cursor-pointer mr-4">
              <FriendIcon />
            </div>
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-yel cursor-pointer mr-4">
              <WeiboOutlined />
            </div>
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-yel cursor-pointer mr-4">
              <QqOutlined />
            </div>
          </div>
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
