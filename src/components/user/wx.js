import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Switch, message } from "antd";
import { postUser } from "@/api/user";
export default function Wx({ asyncUserInfo }) {
  const [qqValue, setQQValue] = useState(asyncUserInfo.qq);
  const [wxValue, setWXValue] = useState(asyncUserInfo.wx);
  const bindMess = (value, type) => {
    let fn = async () => {
      let data = {
        [type]: value,
      };
      let res = await postUser(data);
      if (res.code == "0") {
        message.success(type + "绑定成功！");
      }
    };
    fn();
  };
  return (
    <div
      className="md:flex-col "
      style={{ padding: "0 6vw", marginTop: "36px" }}
    >
      <header className="flex text-xl relative -left-6 md:flex-col md:items-start">
        <div> 第三方账号绑定</div>
        <div
          style={{ color: "#B6B6B6", alignSelf: "end", marginLeft: "10px" }}
          className="text-sm md:mt-4 md:ml-0"
        >
          绑定的第三方账号可用于登录或内容分享
        </div>
      </header>
      <div className=" flex justify-between mt-6 md:flex-col " id="wx">
        <div
          className="flex items-center  justify-around md:flex-col md:items-start"
          style={{ width: "400px" }}
        >
          <div className="flex items-center">
            <div className="mr-4">QQ</div>{" "}
            <Input
              value={qqValue}
              onChange={(e) => {
                setQQValue(e.target.value);
              }}
              defaultValue={asyncUserInfo.qq ? asyncUserInfo.qq : undefined}
              placeholder="请绑定账号"
              style={{ width: "260px" }}
            />
          </div>
          <Button
            onClick={() => {
              bindMess(qqValue, "qq");
            }}
            className="md:mt-2 mr:4"
          >
            绑定QQ
          </Button>
        </div>
        <div
          className="flex items-center  justify-around md:flex-col md:items-start md:mt-4"
          style={{ width: "400px" }}
        >
          <div className="flex items-center">
            <div className="mr-4">微信</div>{" "}
            <Input
              value={wxValue}
              onChange={(e) => {
                setWXValue(e.target.value);
              }}
              defaultValue={asyncUserInfo.wx ? asyncUserInfo.wx : undefined}
              placeholder="请绑定账号"
              style={{ width: "260px" }}
            />
          </div>
          <Button
            onClick={() => {
              bindMess(wxValue, "wx");
            }}
            className="md:mt-2 mr:4"
          >
            绑定账号
          </Button>
        </div>
      </div>
    </div>
  );
}
