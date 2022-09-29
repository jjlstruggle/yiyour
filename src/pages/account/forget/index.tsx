import { Input, Button, message } from "antd";
import { useState, useRef } from "react";
import { forgetPassword, sendCode } from "@/api/auth";
import { useNavigate } from "react-router-dom";

const Forget = () => {
  const [phone, setPhone] = useState("");
  const [psword, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [phonee, setPhonee] = useState({ e: false, t: "" });
  const [psworde, setPsworde] = useState({ e: false, t: "" });
  const [codee, setCodee] = useState({ e: false, t: "" });
  const [hasSendCode, setHasSendCode] = useState(false);
  const [time, setTime] = useState(60);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const $temp = useRef<string>();

  const submit = async () => {
    let can = true;
    if (!phone) {
      setPhonee({ e: true, t: "请输入手机号" });
      can = false;
    }
    if (!psword) {
      setPsworde({ e: true, t: "请输入密码" });
      can = false;
    }
    if (!code) {
      setCodee({ e: true, t: "请输入验证码" });
    }

    if (can) {
      const res = await forgetPassword(phone, $temp.current!, psword);

      if (res.code === "1003") {
        setCodee({ e: true, t: "验证码错误" });
      } else if (res.code === "0") {
        message.success("重置成功");
        navigate("/account/login");
      } else if (res.code == "1002") {
        message.warn("手机号已被占用");
      } else {
        message.warn("new error wait to handle");
      }
    }
  };
  return (
    <div className="pb-6 px-12">
      <div className="text-main text-xl mt-4 pb-1 mb-2  border-b-main border-b-4 border-solid border-t-0 border-l-0 border-r-0 inline-block">
        忘记密码
      </div>
      <div className="text-base font-bold mb-1">找回密码</div>
      <div className="text-gray-500 text-xs">验证码将会发送至你的手机</div>
      <div className="my-3">
        <Input
          status={phonee.e ? "error" : ""}
          placeholder="请填写手机号"
          value={phone}
          onChange={(e) => {
            if (
              !isNaN(e.target.value as unknown as number) &&
              e.target.value.length <= 11
            )
              setPhone(e.target.value);
            if (phonee.e) {
              setPhonee({ e: false, t: "" });
            }
          }}
        />
        <div className="text-xs text-red-500">{phonee.e && phonee.t}</div>
      </div>

      <div className="my-3">
        <div className="relative flex items-center">
          <Input
            status={codee.e ? "error" : ""}
            placeholder="请输入验证码"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (codee.e) {
                setCodee({ e: false, t: "" });
              }
            }}
          />
          <div
            className="absolute right-4 cursor-pointer z-10 hover:text-main transition-colors "
            onClick={async () => {
              if (!hasSendCode) {
                if (!phone) {
                  setPhonee({ e: true, t: "请输入手机号" });
                } else {
                  const res = await sendCode(phone);
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
              }
            }}
          >
            {hasSendCode ? time : "获取验证码"}
          </div>
        </div>
        <div className="text-xs text-red-500">{codee.e && codee.t}</div>
      </div>
      <div className="my-3">
        <Input.Password
          status={psworde.e ? "error" : ""}
          placeholder="请填写新密码"
          value={psword}
          onChange={(e) => {
            setPassword(e.target.value);
            if (psworde.e) {
              setPsworde({ e: false, t: "" });
            }
          }}
        />
        <div className="text-xs text-red-500">{psworde.e && psworde.t}</div>
      </div>
      <div className="flex justify-between my-1 text-gray-500 text-xs">
        <div
          className="cursor-pointer hover:text-main"
          onClick={() => {
            navigate("/account/lgoin");
          }}
        >
          返回去登录
        </div>
        <div
          className="cursor-pointer hover:text-main"
          onClick={() => {
            navigate("/account/register");
          }}
        >
          立即注册
        </div>
      </div>
      <Button type="primary" block className="mt-4" onClick={submit}>
        完成
      </Button>
    </div>
  );
};

export default Forget;
