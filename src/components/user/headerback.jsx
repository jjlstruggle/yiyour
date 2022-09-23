import { Avatar, Button } from "antd";
import UserContext from "@/context/user";
import { useState, useContext, useRef } from "react";
export default function HeaderBack() {
  const { user, dispatchUserInfo } = useContext(UserContext);
  return (
    <div
      className="w-full py-8  px-12 flex justify-between items-end  md:h-[20vh]"
      style={{ height: "24vh", backgroundColor: "#86775D" }}
    >
      <div className="flex items-center ">
        <Avatar src={user.userInfo.avatar} size={72} />
        <span className="ml-10 text-white text-2xl">
          {user.userInfo.username}123
        </span>
      </div>
      <Button
        style={{ backgroundColor: "#86775D" }}
        className="text-white text-base "
      >
        上传封面
      </Button>
    </div>
  );
}
