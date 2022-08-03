import { Link } from "react-router-dom";
import { Modal } from "antd";
import useLazy from "@/hooks/useLazy";
import { useState } from "react";

const Login = useLazy(import("./login"));

export default function User() {
  const [visible, setVisble] = useState(false);
  return (
    <Link to="/user">
      <div className="flex items-center cursor-pointer mr-8">
        <img
          className="w-7 h-7 rounded-full mr-3"
          src="https://www.mooyuu.com/uploadfile/2021/1011/thumb_1000_0_20211011032316905.png"
        />
        <div className=" text-white flex items-center">秦海峰</div>
        <Modal visible={visible} footer={null}>
          <Login />
        </Modal>
      </div>
    </Link>
  );
}
