import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Switch } from "antd";
export default function Wx() {
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
            <Input placeholder="请绑定账号" style={{ width: "260px" }} />
          </div>
          <Button className="md:mt-2 mr:4">绑定QQ</Button>
        </div>
        <div
          className="flex items-center  justify-around md:flex-col md:items-start md:mt-4"
          style={{ width: "400px" }}
        >
          <div className="flex items-center">
            <div className="mr-4">微信</div>{" "}
            <Input placeholder="请绑定账号" style={{ width: "260px" }} />
          </div>
          <Button className="md:mt-2 mr:4">绑定账号</Button>
        </div>
      </div>
    </div>
  );
}
