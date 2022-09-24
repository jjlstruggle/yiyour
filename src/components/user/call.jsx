import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Switch } from "antd";
const Call = () => {
  return (
    <div className="flex flex-col" style={{ padding: "0 6vw" }}>
      <div className=" flex justify-between md:flex-col md:items-center">
        <div
          className="flex items-center  justify-around md:justify-center md:px-10"
          style={{ width: "400px" }}
        >
          <div>电话</div>{" "}
          <Input className="callInput" style={{ width: "260px" }} />
          <Button className="md:hidden ">绑定电话</Button>
        </div>
        <div
          className="md:w-[90vw] md:items-center md:justify-between md:mt-4 md:px-8"
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
        >
          <Button className="hidden md:flex ">绑定电话</Button>
          <div>
            <span> 在主页展示电话</span>
            <Switch style={{ marginLeft: "10px" }} defaultChecked />
          </div>
        </div>
      </div>
      <div
        className="flex justify-between md:flex-col md:items-center "
        style={{ marginTop: "20px" }}
      >
        <div
          className="flex items-center  justify-around md:justify-center md:px-10"
          style={{ width: "400px" }}
        >
          <div>邮箱</div>
          <Input className="callInput" style={{ width: "260px" }} />
          <Button className="md:hidden">绑定邮箱</Button>
        </div>
        <div
          className="md:w-[90vw] md:items-center md:justify-between md:mt-4 md:px-8"
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
        >
          <Button className="hidden md:flex">绑定邮箱</Button>
          <div>
            <span> 在主页展示邮箱</span>
            <Switch style={{ marginLeft: "10px" }} defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Call;
