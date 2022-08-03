import { Input, Tabs, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import img from "@/assets/temp/icon.avif";
import { Dispatch, SetStateAction, useState } from "react";
import { sendCode, login } from "@/api/auth";
const { TabPane } = Tabs;

export default function Login({
  setVisble,
}: {
  setVisble: Dispatch<SetStateAction<boolean>>;
}) {
  const [mode, setMode] = useState<"code" | "password" | "register">("code");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [psword, setPassword] = useState("");
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
        {mode === "register" ? (
          <div></div>
        ) : (
          <>
            <Tabs defaultActiveKey="1" centered className="mt-4">
              <TabPane tab="手机快速登录" key="1" className="mt-4">
                <Input
                  placeholder="手机号"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <div className="relative flex items-center my-4">
                  <Input
                    placeholder="请输入验证码"
                    autoComplete="off"
                    value={code}
                  />
                  <div className="absolute right-4 cursor-pointer z-10 hover:text-main transition-colors ">
                    获取验证码
                  </div>
                </div>
              </TabPane>
              <TabPane tab="密码登录" key="2" className="mt-4">
                <Input />
              </TabPane>
            </Tabs>
            <Button type="primary" block className="mt-4">
              登录
            </Button>
            <div className="flex items-center justify-between pb-6 py-3">
              <div>忘记密码？</div>
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
