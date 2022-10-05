import { Avatar, Button, Upload, message } from "antd";
import UserContext from "@/context/user";
import { useState, useContext, useRef, useLayoutEffect } from "react";
import { getUser } from "@/api/user";
import request from "@/util/fetch";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function HeaderBack() {
  const [asyncUserInfo, setAsyncUserInfo] = useState({
    avatar: "",
    city: "",
    code: "",
    cover: "",
    emailShow: 0,
    gender: "",
    id: 0,
    introduction: "",
    job: "",
    organization: "",
    phone: "",
    phoneShow: 0,
    qq: "",
    username: "",
    wx: "",
  });
  const [imgUrl, setImgUrl] = useState(asyncUserInfo.avatar);
  useLayoutEffect(() => {
    if (!asyncUserInfo.avatar) {
      (async () => {
        let res = await getUser();
        if (res.code === "0") {
          setAsyncUserInfo(res.data);
        }
      })();
    }
    setImgUrl(asyncUserInfo.avatar);
  }, [asyncUserInfo]);
  const { user, dispatchUserInfo } = useContext(UserContext);
  const uploadUrl = () => {};
  return (
    <div
      className="w-full py-8  px-12 flex justify-between items-end  md:h-[20vh]"
      style={{
        height: "32vh",
        backgroundColor: "#86775D",
        background: `url(${
          asyncUserInfo.cover
            ? asyncUserInfo.cover
            : require("@/assets/image/login/bg.png")
        }) no-repeat center `,
        backgroundSize: "100% ",
      }}
    >
      <div className="flex items-center ">
        <Avatar src={imgUrl} size={72} />
        <span className="ml-10 text-white text-2xl">
          {asyncUserInfo.username}
        </span>
      </div>
      <Upload
        maxCount={1}
        action={"http://47.96.86.132:88/api-oss/"}
        className="hover:cursor-pointer border-solid  rounded-md my-3 w-28 h-10 bg-main text-white text-sm ml-6 flex justify-center items-center"
        // listType={"picture-card"}
        accept={"image/*"}
        showUploadList={false}
        onChange={async (info) => {
          if (info.file.status !== "uploading") {
            console.log(info);
          }
          if (info.file.status === "done") {
            let data = {
              cover: info.file.response.data.imageUrl,
            };
            let res = await request.post(
              "/api-user/update",
              JSON.stringify(data)
            );
            if (res.status == 500) {
              return message.error(`更新出错`);
            }
            setImgUrl(info.file.response.data.imageUrl);
            message.success(`${info.file.name} 文件上传成功`);
            console.log(
              "info.file.response.data.imageUrl",
              info.file.response.data.imageUrl
            );
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} 文件上传失败`);
          }
        }}
      >
        上传封面
      </Upload>
    </div>
  );
}
