import { Button } from "antd";
import HeaderInput from "./header/input";
import { MailOutlined } from "@ant-design/icons";
import { ForwardedRef, forwardRef, memo } from "react";

function Head({
  headerContainer,
}: {
  headerContainer: ForwardedRef<HTMLDivElement>;
}) {
  return (
    <div
      className="head flex items-center justify-between px-12 bg-main pt-8 pb-6"
      ref={headerContainer}
    >
      <div className=" flex justify-between">
        <Button className="text-main">我要发布</Button>
        <Button className="text-main left-7 relative   ">版权帮助</Button>
      </div>
      <div className="w-96 ">
        <HeaderInput />
      </div>
      <div className="flex items-center">
        <div className="flex items-center cursor-pointer mr-8">
          <img
            className="w-7 h-7 rounded-full mr-3"
            src="https://www.mooyuu.com/uploadfile/2021/1011/thumb_1000_0_20211011032316905.png"
          />
          <div className=" text-white flex items-center">秦海峰</div>
        </div>
        <MailOutlined className="text-white text-2xl flex items-center cursor-pointer" />
      </div>
    </div>
  );
}

export default memo(
  forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => (
    <Head {...props} headerContainer={ref} />
  ))
);
