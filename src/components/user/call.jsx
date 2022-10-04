import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Switch, message } from "antd";
import { postUser } from "@/api/user";
const Call = ({ asyncUserInfo }) => {
  const [phoneChecked, setPhoneChecked] = useState(asyncUserInfo.phoneShow);
  const [emailChecked, setEmailChecked] = useState(asyncUserInfo.emailShow);
  const [phoneValue, setPhoneValue] = useState(asyncUserInfo.phone);
  const [emailValue, setEmailValue] = useState(asyncUserInfo.email);
  const changeChecked = (type) => {
    let fn = async () => {
      let temp = type + "Show";
      let res = await postUser({
        [temp]: !(type + "Checked") ? 0 : 1,
      });
      if (res.code == "0") {
        if (type == "email") {
          console.log(1111111111111);
          setEmailChecked(emailChecked ? 0 : 1);
        } else {
          setPhoneChecked(phoneChecked ? 0 : 1);
        }
        message.success("切换成功");
      }
    };
    switch (type) {
      case "phone": {
        fn(type);
        break;
      }
      case "email": {
        fn(type);
        break;
      }
      default:
        return;
    }
  };
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
    <div className="flex flex-col md:w-full " style={{ padding: "0 6vw" }}>
      <div className=" flex justify-between md:flex-col md:items-center ">
        <div
          className="flex items-center  justify-around md:justify-center  md:px-14 "
          style={{ width: "400px" }}
          id="Box"
        >
          <div>电话</div>{" "}
          <Input
            onChange={(e) => {
              setPhoneValue(e.target.value);
            }}
            defaultValue={asyncUserInfo.phone ? asyncUserInfo.phone : undefined}
            className="callInput"
            style={{ width: "260px" }}
          />
          <Button
            onClick={() => {
              bindMess(phoneValue, "phone");
            }}
            className="md:hidden "
          >
            绑定电话
          </Button>
        </div>
        <div
          className="md:w-[90vw] md:items-center md:justify-between md:mt-4 md:px-8"
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
          id="small"
        >
          <Button className="hidden md:flex ">绑定电话</Button>
          <div>
            <span> 在主页展示电话</span>
            <Switch
              onChange={() => {
                changeChecked("phone");
              }}
              checked={phoneChecked}
              style={{ marginLeft: "10px" }}
            />
          </div>
        </div>
      </div>
      <div
        className="flex justify-between md:flex-col md:items-center "
        style={{ marginTop: "20px" }}
      >
        <div
          className="flex items-center  justify-around md:justify-center md:px-10"
          id="Box"
          style={{ width: "400px" }}
        >
          <div>邮箱</div>
          <Input
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
            defaultValue={asyncUserInfo.email ? asyncUserInfo.email : undefined}
            className="callInput"
            style={{ width: "260px" }}
          />
          <Button
            onClick={() => {
              bindMess(emailValue, "email");
            }}
            className="md:hidden"
          >
            绑定邮箱
          </Button>
        </div>
        <div
          className="md:w-[90vw] md:items-center md:justify-between md:mt-4 md:px-8"
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
          id="small"
        >
          <Button className="hidden md:flex">绑定邮箱</Button>
          <div>
            <span> 在主页展示邮箱</span>
            <Switch
              onChange={() => {
                changeChecked("email");
              }}
              checked={emailChecked}
              style={{ marginLeft: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Call;
