import useLazy from "@/hooks/useLazy";
import { useState, useContext, useRef, useMemo } from "react";
import UserContext from "@/context/user";
import { postUser } from "@/api/user";
import { sendCode } from "@/api/auth";
import {
  UserOutlined,
  IdcardOutlined,
  InsuranceOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Input, Button, Avatar, message, Upload } from "antd";
import "./person.css";
const Header = useLazy(import("@/components/user/header"));
const Back = useLazy(import("@/components/user/back"));
const Myavatar = useLazy(import("@/components/user/upload"));
export default function Edit() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState<{ status: boolean; value: string }>({
    status: false,
    value: "",
  });
  const [userOrg, setUserOrg] = useState<{
    status: boolean;
    value: string;
  }>({
    status: false,
    value: "",
  });
  const [userPas, setUserPas] = useState<{
    status: boolean;
    value: string;
  }>({
    status: false,
    value: "",
  });
  const [userChe, setUserChe] = useState<{
    status: boolean;
    value: string;
  }>({
    status: false,
    value: "",
  });
  const [hasSendCode, setHasSendCode] = useState(false);
  const { user }: any = useContext(UserContext);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [time, setTime] = useState(60);
  const postUserMes = () => {
    const body = {};
    if (avatarUrl) body["avatar"] = avatarUrl;
    else body["avatar"] = String(user.userInfo.avatar);
    if (userPas.value) body["password"] = userPas.value;
    else return message.error("请输入密码");
    if (userChe.value) body["code"] = userChe.value;
    else return message.error("请输入验证码");
    if (userName.value) body["username"] = userName.value;
    else return message.error("请输入用户昵称");
    if (userOrg.value) body["organization"] = userOrg.value;
    else return message.error("请输入用户昵称");
    body["id"] = user.userInfo.id;
    body["phone"] = String(user.userInfo.phone);
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
      style={{
        backgroundColor: "#F7F7F7",
        height: "100vh",
        padding: "4vh 5vw",
      }}
    >
      <Back />
      <Header star={true} />
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
        <Myavatar pic={avatarUrl} setPic={setAvatarUrl} />
        <Input
          className="my-4 w-80"
          placeholder="用户昵称"
          prefix={<UserOutlined />}
          value={userName.value}
          onChange={(e) => {
            setUserName({ status: false, value: e.target.value });
          }}
        />
        <Input
          className="my-4  w-80"
          placeholder="企业/学校"
          prefix={<IdcardOutlined />}
          value={userOrg.value}
          onChange={(e) => {
            setUserOrg({ status: false, value: e.target.value });
          }}
        />
        <Input.Password
          className="my-4  w-80"
          placeholder="设置密码"
          prefix={<InsuranceOutlined />}
          value={userPas.value}
          onChange={(e) => {
            setUserPas({ status: false, value: e.target.value });
          }}
        />
        <div className="flex items-center  w-80 relative">
          <Input
            className="my-4  w-80"
            placeholder="请输入验证码"
            prefix={<KeyOutlined />}
            value={userChe.value}
            onChange={(e) => {
              if (e.target.value.length == 6) {
                setUserChe({ status: true, value: e.target.value });
              } else if (e.target.value.length > 6) {
                message.error("验证码最多为6位");
              } else {
                setUserChe({
                  status: false,
                  value: e.target.value,
                });
              }
            }}
          />
          <div
            className="cursor-pointer  absolute right-5 z-10 hover:text-main transition-colors "
            onClick={async () => {
              if (time == -1) {
                setTime(60);
              }
              if (!hasSendCode) {
                const res = await sendCode(user.userInfo.phone);
                message.success("发送成功");
                setHasSendCode(true);
                // $temp.current = res.data;
                console.log(time);

                timer.current = setInterval(() => {
                  setTime((time) => {
                    if (time == 0) {
                      console.log(time);
                      setTime(60);
                      setHasSendCode(false);
                      clearInterval(timer.current);
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
        <Button
          onClick={postUserMes}
          className="my-3 w-28 h-10 bg-main text-white text-sm"
        >
          修改
        </Button>
      </div>
    </div>
  );
}
