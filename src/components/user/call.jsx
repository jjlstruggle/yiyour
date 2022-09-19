import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Switch } from "antd";
const Call = () => {
  return (
    <div className="flex flex-col" style={{ padding: "0 6vw" }}>
      <div className=" flex justify-between">
        <div
          className="flex items-center  justify-around"
          style={{ width: "400px" }}
        >
          电话 <Input style={{ width: "260px" }} />
          <Button>绑定电话</Button>
        </div>
        <div
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
        >
          在主页展示电话{" "}
          <Switch style={{ marginLeft: "10px" }} defaultChecked />
        </div>
      </div>
      <div className="flex justify-between" style={{ marginTop: "20px" }}>
        <div
          className="flex items-center  justify-around"
          style={{ width: "400px" }}
        >
          邮箱
          <Input style={{ width: "260px" }} />
          <Button>绑定邮箱</Button>
        </div>
        <div
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
        >
          在主页展示邮箱{" "}
          <Switch style={{ marginLeft: "10px" }} defaultChecked />
        </div>
      </div>
    </div>
  );
};
export default Call;
