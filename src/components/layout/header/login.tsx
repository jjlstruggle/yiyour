import { Input, Tabs, Button, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import img from "@/assets/temp/icon.avif";
import { Dispatch, SetStateAction, useRef, useState, useContext } from "react";
import { login } from "@/api/auth";
import useLazy from "@/hooks/useLazy";
import UserContext from "@/context/user";
const { TabPane } = Tabs;
const Register = useLazy(import("./register"));
const Forget = useLazy(import("./forget"));

export default function Login({
  setVisble,
}: {
  setVisble: Dispatch<SetStateAction<boolean>>;
}) {
  const [mode, setMode] = useState<
    "code" | "password" | "register" | "forgetPassword"
  >("code");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [psword, setPassword] = useState("");
  const [hasSendCode, setHasSendCode] = useState(false);
  const [time, setTime] = useState(60);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [emaile, setEmaile] = useState({ e: false, t: "" });
  const [psworde, setPsworde] = useState({ e: false, t: "" });

  const { dispatchUserInfo } = useContext(UserContext);

  const handleLogin = async () => {
    let can = true;

    if (mode === "password") {
      if (!email) {
        setEmaile({ e: true, t: "请输入邮箱" });
        can = false;
      }
      if (!psword) {
        setPsworde({ e: true, t: "请输入密码" });
        can = false;
      }
      if (can) {
        const close = message.loading("登录中", 0);
        const res = await login(email, psword);
        close();
        if (res.code == "0") {
          message.success("登录成功");
          localStorage.setItem("token", res.data.token.token);
          localStorage.setItem("header", res.data.token.tokenHead);
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatchUserInfo({
            hasLogin: true,
            userInfo: res.data,
          });
          setVisble(false);
        } else if (res.code == "1000") {
          setPsworde({ e: true, t: res.msg });
        } else {
          console.log(res);
          message.warn("new error wait to handle");
        }
      }
    }
  };

  return (
    <div>
      <div className="flex items-center relative">
        <img src={img} className="w-full" />
        <div
          className="absolute right-4 text-white text-2xl font-bold cursor-pointer hover:text-3xl transition-all duration-100"
          onClick={() => {
            setVisble(false);
          }}
        >
          <CloseOutlined />
        </div>
      </div>
      <div className="px-24">
        {mode === "forgetPassword" ? (
          <Forget setVisble={setVisble} />
        ) : mode === "register" ? (
          <Register setVisble={setVisble} />
        ) : (
          <>
            <Tabs
              defaultActiveKey="1"
              centered
              className="mt-4"
              onChange={(key) => {
                if (key == "1") {
                  setMode("code");
                } else {
                  setMode("password");
                }
              }}
            >
              <TabPane tab="手机快速登录" key="1" className="mt-4">
                <Input
                  placeholder="手机号"
                  value={phone}
                  onChange={(e) => {
                    if (
                      !isNaN(e.target.value as unknown as number) &&
                      e.target.value.length <= 11
                    )
                      setPhone(e.target.value);
                  }}
                />
                <div className="relative flex items-center my-4">
                  <Input
                    placeholder="请输入验证码"
                    autoComplete="off"
                    value={code}
                  />
                  <div
                    className="absolute right-4 cursor-pointer z-10 hover:text-main transition-colors "
                    onClick={async () => {
                      setHasSendCode(true);
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
                    }}
                  >
                    {hasSendCode ? time : "获取验证码"}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="密码登录" key="2" className="mt-4">
                <div className="py-3">
                  <Input
                    status={emaile.e ? "error" : ""}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emaile.e) {
                        setEmaile({ e: false, t: "" });
                      }
                    }}
                    placeholder="请输入邮箱"
                  />
                  <div className="text-xs text-red-500">
                    {emaile.e && emaile.t}
                  </div>
                </div>
                <div className="py-3">
                  <Input.Password
                    placeholder="请输入密码"
                    status={psworde.e ? "error" : ""}
                    value={psword}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (psworde.e) {
                        setPsworde({ e: false, t: "" });
                      }
                    }}
                  />
                  <div className="text-xs text-red-500">
                    {psworde.e && psworde.t}
                  </div>
                </div>
              </TabPane>
            </Tabs>
            <Button type="primary" block className="mt-4" onClick={handleLogin}>
              登录
            </Button>
            <div className="flex items-center justify-between pb-6 py-3">
              <div
                className="cursor-pointer hover:text-main transition-colors duration-200"
                onClick={() => setMode("forgetPassword")}
              >
                忘记密码？
              </div>
              <div
                className="cursor-pointer hover:text-main transition-colors duration-200"
                onClick={() => setMode("register")}
              >
                立即注册
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
