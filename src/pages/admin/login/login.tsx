import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import logo from "@/assets/temp/shell.jpg";
import "./logins.less";
import { login } from "@/api/auth";
import { adminLogin } from "@/interface/api";
import { useDispatch } from "@/hooks/useDispatch";
import { useNavigate } from "react-router-dom";

type IdentityType = {
  avatar:string;
  id: number;
  email: string;
  username: string;
  organization:string;
  token:{
    token:string;
    tokenHead:"Authorization"
  }
};


export default function ConsoleLogin(){
  const dispatch = useDispatch();
  const Wrapper = (props: any) => {
    return (
      <div className="wrapper">
        <div className="login-wrapper">
          {props.children}
          <img className="logo" src={logo} alt="logo"></img>
        </div>
      </div>
    );
  };

  const FormLogin = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: adminLogin) => {
      try {
        setLoginLoading(true);
        const res = await login(values.email,values.password);
        if (res.code === "0"){
          const user: IdentityType = res.data;
          const token: string = res.data?.token;
          const {email, id} = user;
          sessionStorage.setItem("user", JSON.stringify(email));
          sessionStorage.setItem("id", String(id));
          sessionStorage.setItem("token", token);
          console.log(res)
          message.success(`欢迎您，${user || "用户"}`);
          user.id === 1852
            ? navigate("/console")
            : navigate("/admin");
        }
      } finally {
        setLoginLoading(false);
      }
    };

    const onReset = () => {
      form.resetFields();
    };

    return (
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="账号"
          name="email"
          rules={[{ required: true, message: "请输入账号" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 15, span: 24 }}>
          <Button
            loading={loginLoading}
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20 }}
          >
            登录
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Wrapper>
      <FormLogin></FormLogin>
    </Wrapper>
  );
};
