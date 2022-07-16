import { Button, Layout } from "antd";
import HeaderInput from "./header/input";
import { MailOutlined } from "@ant-design/icons";
const { Header } = Layout;
export default function Head() {
  return (
    <Header className="head flex items-center justify-between px-12 bg-main">
      <Button className="text-main">我要发布</Button>
      <div className="w-96">
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
    </Header>
  );
}
