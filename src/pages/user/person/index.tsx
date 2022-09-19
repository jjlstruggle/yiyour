import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
const PersonEdit = useLazy(import("./personEdit/index"));
const AccountEdit = useLazy(import("./accountEdit/index"));
import { useState, useContext, useRef } from "react";
import UserContext from "@/context/user";
import { useNavigate } from "react-router-dom";
import { postUser } from "@/api/user";
import { sendCode } from "@/api/auth";
import {
  UserOutlined,
  IdcardOutlined,
  InsuranceOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Input, Button, Avatar, message, Upload } from "antd";
import type { UploadProps } from "antd";
import "./person.css";
//个人信息
export default function Person() {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState(false);
  const Content = () => {
    return (
      <div
        className="flex flex-col  mt-6 "
        style={{
          backgroundColor: "#FFFFFF",
          padding: "4.2vh 2.2vw",
          borderRadius: "12px",
          boxShadow: "6px 6px 12px #DEDEDE",
          border: "1px solid  #DEDEDE",
        }}
      >
        <ul className="flex list-none  text-xl">
          <li
            onClick={() => {
              if (contentType) setContentType(false);
            }}
            style={!contentType ? { borderBottom: "3px solid #000000" } : {}}
          >
            个人资料
          </li>
          <li
            onClick={() => {
              if (!contentType) setContentType(true);
            }}
            style={contentType ? { borderBottom: "3px solid #000000" } : {}}
            className="mx-12"
          >
            账号设置
          </li>
        </ul>
        <div className="flex flex-col w-full   box-border h-full  px-9 mt-5">
          {contentType ? <AccountEdit /> : <PersonEdit />}
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        padding: "4vh 5vw",
      }}
    >
      <Button
        className="shadow-sm w-24 mb-2 h-10 bg-white text-main text-base font-semibold -translate-y-1"
        onClick={() => {
          navigate("/home");
        }}
      >
        返回
      </Button>
      <Header star={true} />
      <Content />
    </div>
  );
}
