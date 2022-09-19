import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Switch } from "antd";
export default function Pwd() {
  return (
    <div style={{ padding: "0 6vw", marginTop: "42px" }}>
      <header className="flex text-xl relative -left-6">更改密码</header>
      <div className="flex flex-col " style={{ marginTop: "32px" }}>
        <div className="flex justify-between ">
          <div
            className="flex items-center justify-around"
            style={{ width: "420px" }}
          >
            原密码
            <Input style={{ width: "330px" }} />
          </div>
          <div
            className="flex items-center  justify-around"
            style={{ width: "420px" }}
          >
            验证码
            <Input style={{ width: "330px" }} />
          </div>
        </div>
        <div className="flex justify-between " style={{ marginTop: "24px" }}>
          <div
            className="flex items-center justify-around"
            style={{ width: "420px" }}
          >
            新密码
            <Input style={{ width: "330px" }} />
          </div>
          <div
            className="flex items-center justify-around"
            style={{ width: "420px" }}
          >
            确认新密码
            <Input style={{ width: "330px" }} />
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            width: "72vw",
            padding: "0 6vw",
            justifyContent: "start",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button style={{ backgroundColor: "#62D7D6", color: "#FFFFFF" }}>
            保存{" "}
          </Button>
          <Button
            style={{
              color: "#636363",
              backgroundColor: "#FFFFFF",
              marginLeft: "30px",
            }}
          >
            {" "}
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
