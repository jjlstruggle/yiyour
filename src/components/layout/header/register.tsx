import { Input, Button, message } from "antd";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { register, sendCode } from "@/api/auth";

const Register = ({
  setVisble,
}: {
  setVisble: Dispatch<SetStateAction<boolean>>;
}) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [psword, setPassword] = useState("");
  const [twePsword, setTwePassword] = useState("");
  const [code, setCode] = useState("");
  const [phonee, setPhonee] = useState({ e: false, t: "" });
  const [psworde, setPsworde] = useState({ e: false, t: "" });
  const [twepsworde, setTwePe] = useState({ e: false, t: "" });
  const [emaile, setEmaile] = useState({ e: false, t: "" });
  const [codee, setCodee] = useState({ e: false, t: "" });
  const [hasSendCode, setHasSendCode] = useState(false);
  const [time, setTime] = useState(60);
  const timer = useRef<ReturnType<typeof setTimeout>>();

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
    if (!twePsword || psword != twePsword) {
      setTwePe({ e: true, t: "两次输入的密码不同" });
      can = false;
    }
    if (!email) {
      setEmaile({ e: true, t: "请输入邮箱" });
      can = false;
    }
    if (!code) {
      setCodee({ e: true, t: "请输入验证码" });
    }

    if (can) {
      const close = message.loading("注册中", 0);

      const res = await register(phone, psword, email, $temp.current!);
      close();

      if (res.code === "1003") {
        setCodee({ e: true, t: "验证码错误" });
      } else if (res.code === "0") {
        message.success("注册成功");
        setVisble(false);
        // 暂且不处理
      } else if (res.code == "1002") {
        message.warn("手机号已被占用");
      } else if (res.code == "1005") {
        message.warn("邮箱已被占用");
      } else {
        message.warn("new error wait to handle");
      }
    }
  };
  return (
    <div className="pb-6">
      <div className="text-xl text-center mt-4 mb-2">账号注册</div>
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
        <Input.Password
          status={psworde.e ? "error" : ""}
          placeholder="请填写密码"
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
      <div className="my-3">
        <Input.Password
          status={twepsworde.e ? "error" : ""}
          placeholder="请再次密码"
          value={twePsword}
          onChange={(e) => {
            setTwePassword(e.target.value);
            if (twepsworde.e) {
              setTwePe({ e: false, t: "" });
            }
          }}
        />
        <div className="text-xs text-red-500">
          {twepsworde.e && twepsworde.t}
        </div>
      </div>
      <div className="my-3">
        <Input
          status={emaile.e ? "error" : ""}
          placeholder="请填写邮箱"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emaile.e) {
              setEmaile({ e: false, t: "" });
            }
          }}
        />
        <div className="text-xs text-red-500">{emaile.e && emaile.t}</div>
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
      <Button type="primary" block className="mt-4" onClick={submit}>
        注册
      </Button>
    </div>
  );
};

export default Register;
