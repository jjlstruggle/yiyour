import { Button } from "antd";
import HeaderInput from "./header/input";
import { MailOutlined } from "@ant-design/icons";
import { ForwardedRef, forwardRef, memo } from "react";
import { Link } from "react-router-dom";
import User from "./header/user";

function Head({
  headerContainer,
}: {
  headerContainer: ForwardedRef<HTMLDivElement>;
}) {
  return (
    <div
      className="head flex items-center justify-between px-12 pt-8 pb-6"
      ref={headerContainer}
    >
      <div className=" flex justify-between">
        <Link to="/publish">
          <Button className="text-main">我要发布</Button>
        </Link>
        <Button className="text-main left-7 relative   ">版权帮助</Button>
      </div>
      <div className="w-96 ">
        <HeaderInput />
      </div>
      <div className="flex items-center">
        <User />
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
