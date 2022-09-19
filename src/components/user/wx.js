import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Switch } from "antd";
export default function Wx() {
  return (
    <div style={{ padding: "0 6vw", marginTop: "36px" }}>
      <header className="flex text-xl relative -left-6">
        第三方账号绑定
        <div
          style={{ color: "#B6B6B6", alignSelf: "end", marginLeft: "10px" }}
          className="text-sm"
        >
          绑定的第三方账号可用于登录或内容分享
        </div>
      </header>
      <div className=" flex justify-between mt-6 ">
        <div
          className="flex items-center  justify-around"
          style={{ width: "400px" }}
        >
          电话 <Input placeholder="请绑定电话" style={{ width: "260px" }} />
          <Button>绑定电话</Button>
        </div>
        <div
          className="flex items-center  justify-around"
          style={{ width: "400px" }}
        >
          微信 <Input placeholder="请绑定账号" style={{ width: "260px" }} />
          <Button>绑定账号</Button>
        </div>
      </div>
    </div>
  );
}
