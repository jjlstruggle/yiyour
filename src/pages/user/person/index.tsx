import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
import { useState, useContext } from "react";
import UserContext from "@/context/user";
import {
  UserOutlined,
  UploadOutlined,
  BorderOutlined,
} from "@ant-design/icons";
import { Input, Button, Avatar, message, Upload } from "antd";
import type { UploadProps } from "antd";
import "./person.css";
const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
//个人信息
export default function Person() {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useContext(UserContext);
  const Content = () => {
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
            icon={<UserOutlined />}
            src={
              //@ts-ignore
              user.userInfo.avatar
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
            prefix={<UserOutlined />}
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
            prefix={<BorderOutlined />}
          />
        ) : (
          <div className=" text-lg text-purple-500 border-solid rounded-lg px-4 flex items-center w-80 h-10  my-5  border-2 border-gray-500 hover:border-purple-500 ">
            邮箱：
            {
              //@ts-ignore
              user.userInfo.email
            }
          </div>
        )}
        {isEdit ? (
          <Button className="my-3 w-28 h-10 bg-main text-white text-sm">
            确认
          </Button>
        ) : (
          <Button
            onClick={() => setIsEdit(true)}
            className="my-3 w-28 h-10 bg-main text-white text-sm"
          >
            编辑
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
      <Header star={true} />
      <Content />
    </div>
  );
}
