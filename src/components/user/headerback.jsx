import { Avatar, Button } from "antd";
import UserContext from "@/context/user";
import { useState, useContext, useRef } from "react";
export default function HeaderBack() {
  const { user, dispatchUserInfo } = useContext(UserContext);
  return (
    <div
      className="w-full py-8  px-24 flex justify-between items-end"
      style={{ height: "28vh", backgroundColor: "#86775D" }}
    >
      <div>
        <Avatar src={user.userInfo.avatar} size={72} />
        <span className="ml-10 text-white text-2xl">用户昵称</span>
      </div>
      <Button
        style={{ backgroundColor: "#86775D" }}
        className="text-white text-base"
      >
        上传封面
      </Button>
    </div>
  );
}
