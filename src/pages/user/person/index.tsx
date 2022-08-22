import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
import { useState, useContext, useRef } from "react";
import UserContext from "@/context/user";
import { useNavigate } from "react-router-dom";
import { postUser } from "@/api/user";
import { sendCode } from "@/api/auth";
import {
  UserOutlined,
  UploadOutlined,
  BorderOutlined,
  IdcardOutlined,
  InsuranceOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Input, Button, Avatar, message, Upload } from "antd";
import type { UploadProps } from "antd";
import "./person.css";
//个人信息
export default function Person() {
  const props: UploadProps = {
    name: "file",
    action: "http://47.96.86.132:88/api-oss/",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setAvatarUrl(info.file.response.data.realUrl);
        console.log(info.file);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [userOrganization, setUserOrganization] = useState("");
  const [userPassWord, setUserPassWord] = useState("");
  const [userCheck, setUserCheck] = useState("");
  const [time, setTime] = useState(60);
  const [hasSendCode, setHasSendCode] = useState(false);
  const { user }: any = useContext(UserContext);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const $temp = useRef<string>();
  const Content = () => {
    const postUserMes = () => {
      const body = {};
      if (avatarUrl) body["avatar"] = avatarUrl;
      else body["avatar"] = String(user.userInfo.username);
      if (userCheck) body["code"] = userCheck;
      else return message.error("请输入验证码");
      body["id"] = user.userInfo.id;
      if (userOrganization) body["organization"] = userOrganization;
      else body["organization"] = String(user.userInfo.organization);
      if (userPassWord) body["password"] = userPassWord;
      else return message.error("请输入密码");
      body["phone"] = String(user.userInfo.phone);
      if (userName) body["username"] = userName;
      else body["username"] = String(user.userInfo.userName);

      let fn = async () => {
        console.log(body);

        let res = await postUser(body);
        if (res.code == "0") {
          message.success("编辑成功");
        }
      };
      fn();
    };
    return (
      <div
        className="flex flex-col  mt-6 h-4/5"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "7.2vh 12.2vw",
          borderRadius: "12px",
          boxShadow: "6px 6px 12px #DEDEDE",
          border: "1px solid  #DEDEDE",
        }}
      >
        <div className="mt-3 flex ">
          <Avatar
            size={64}
            className="flex justify-center items-center"
            //@ts-ignore
            icon={!avatarUrl && !user.userInfo.avatar ? <UserOutlined /> : null}
            src={
              //@ts-ignore
              avatarUrl ? avatarUrl : user.userInfo.avatar
            }
          />

          {isEdit ? (
            <Upload
              {...props}
              className="border-solid  rounded-md my-3 w-28 h-10 bg-main text-white text-sm ml-4 flex justify-center items-center"
            >
              {" "}
              更换头像
            </Upload>
          ) : null}
        </div>
        {isEdit ? (
          <Input
            className="my-4 w-80"
            placeholder="用户昵称"
            prefix={<UserOutlined />}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        ) : (
          <div className="text-lg text-purple-500 border-solid px-4 flex items-center rounded-md w-80 h-10 my-5 border-2 border-gray-500 hover:border-purple-500">
            用户昵称：
            {
              //@ts-ignore
              user.userInfo.username
                ? //@ts-ignore
                  user.userInfo.username
                : "还未设置姓名哦！"
            }
          </div>
        )}
        {isEdit ? (
          <Input
            className="my-4  w-80"
            placeholder="企业/学校"
            prefix={<IdcardOutlined />}
            value={userOrganization}
            onChange={(e) => {
              setUserOrganization(e.target.value);
            }}
          />
        ) : (
          <div className="text-lg text-purple-500 border-solid px-4 flex items-center rounded-md w-80 h-10  my-5 border-2 border-gray-500 hover:border-purple-500 ">
            企业/学校：
            {
              //@ts-ignore
              user.userInfo.organization
                ? //@ts-ignore
                  user.userInfo.organization
                : "还未设置组织哦！"
            }
          </div>
        )}
        {isEdit ? (
          <Input
            className="my-4  w-80"
            placeholder="设置密码"
            prefix={<InsuranceOutlined />}
            value={userPassWord}
            onChange={(e) => {
              setUserPassWord(e.target.value);
            }}
          />
        ) : (
          <div className=" text-lg text-purple-500 border-solid rounded-lg px-4 flex items-center w-80 h-10  my-5  border-2 border-gray-500 hover:border-purple-500 ">
            手机号：
            {
              //@ts-ignore
              user.userInfo.phone
            }
          </div>
        )}
        {isEdit ? (
          <>
            <div className="flex items-center">
              <Input
                className="my-4  w-80"
                placeholder="请输入验证码"
                prefix={<KeyOutlined />}
                value={userCheck}
                onChange={(e) => {
                  setUserCheck(e.target.value);
                }}
              />
              <div
                className="cursor-pointer  ml-5  z-10 hover:text-main transition-colors "
                onClick={async () => {
                  if (!hasSendCode) {
                    const res = await sendCode(user.userInfo.phone);
                    message.success("发送成功");
                    setHasSendCode(true);
                    $temp.current = res.data;
                    timer.current = setInterval(() => {
                      setTime((time) => {
                        if (time == 1) {
                          clearInterval(timer.current);
                          setHasSendCode(false);
                          setTime(60);
                        }
                        return time - 1;
                      });
                    }, 1000);
                  }
                }}
              >
                {hasSendCode ? time : "获取验证码"}
              </div>
            </div>
          </>
        ) : null}
        {isEdit ? (
          <Button
            onClick={postUserMes}
            className="my-3 w-28 h-10 bg-main text-white text-sm"
          >
            确认
          </Button>
        ) : (
          <Button
            onClick={() => setIsEdit(true)}
            className="my-3 w-28 h-10 bg-main text-white text-sm"
          >
            修改
          </Button>
        )}
      </div>
    );
  };
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        height: "100vh",
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
